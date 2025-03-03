import logging
from flask import Flask, request, jsonify, make_response
import mysql.connector
import bleach
import secrets
import time

time.sleep(2)

app = Flask(__name__)
ALLOWED_TOKEN='empty';
# Generate a random token
def generate_token():
    return secrets.token_hex(16)  # Generate a random hex token of 32 characters (16 bytes)
# Configure logging
logging.basicConfig(filename='error.log', level=logging.ERROR)



# Route for generating and sending a token
@app.route('/generate_token', methods=['GET'])
def send_token():
    global ALLOWED_TOKEN  # Access the global variable
    token = generate_token()
    ALLOWED_TOKEN=token
    response = jsonify({'token': token})
    return make_response(response, 200)
# Function to connect to MySQL database

def connect_to_database():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="eartctvi_bedtimestories_admin",
            password="[+Ypp6idY6;V",
            database="eartctvi_ORGS"
        )
        return connection
    except mysql.connector.Error as error:
        logging.error("Error while connecting to MySQL: %s", error)
        return None

# Function to execute MySQL query
def execute_query(query, connection):
    if connection is None:
        logging.error("Error: No database connection.")
        return None
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        return records
    except mysql.connector.Error as error:
        logging.error("Error executing MySQL query: %s", error)
        return None
    finally:
        if 'cursor' in locals():
            cursor.close()

# Middleware to check request token
def check_request_origin(USER_TOKEN):
    if ALLOWED_TOKEN != USER_TOKEN or ALLOWED_TOKEN == 'empty':
        logging.error("Blocked request from unauthorized IP: %s", request.remote_addr)
        return False
    return True


# Route for handling search algorithm requests
 
# Route for handling search algorithm requests
@app.route('/', methods=['GET'])
def search_algorithm():
    try:
        search_query = bleach.clean(request.args.get('searchValue', '')).strip()  # Remove leading and trailing spaces
        if not search_query:
            logging.error("Error: Empty search query.")
            return jsonify(message="Empty search query"), 400

        USER_TOKEN = bleach.clean(request.args.get('USER_TOKEN', ''))
        if not USER_TOKEN:
            logging.error("Error: Empty USER_TOKEN.")
            return jsonify(message="Empty USER_TOKEN"), 400
        
        # Check USER_TOKEN
        if not check_request_origin(USER_TOKEN):
            logging.error("Invalid USER_TOKEN.")
            return jsonify(message="Invalid USER_TOKEN"), 403

        connection = connect_to_database()
        if connection is None:
            return jsonify(message="Failed to connect to database"), 500

        if search_query.lower() == "return first 250 rows for display":  # Convert to lowercase for case-insensitive comparison
            all_rows_query = "SELECT * FROM algorithms LIMIT 250"
            all_rows_results = execute_query(all_rows_query, connection)
            if all_rows_results is None:
                logging.error("Error: Query execution returned null results.")
                return jsonify(message="An error occurred during the search."), 500
            return jsonify(results=all_rows_results)
            
        if search_query.lower() == "return second 250 rows for display":  
            all_rows_query = "SELECT * FROM algorithms OFFSET 250 ROWS FETCH NEXT 250 ROWS ONLY"
            all_rows_results = execute_query(all_rows_query, connection)
            if all_rows_results is None:
                logging.error("Error: Query execution returned null results.")
                return jsonify(message="An error occurred during the search."), 500
            return jsonify(results=all_rows_results)
            
        if search_query.lower() == "return third 250 rows for display":  
            all_rows_query = "SELECT * FROM algorithms OFFSET 500 ROWS FETCH NEXT 250 ROWS ONLY"
            all_rows_results = execute_query(all_rows_query, connection)
            if all_rows_results is None:
                logging.error("Error: Query execution returned null results.")
                return jsonify(message="An error occurred during the search."), 500
            return jsonify(results=all_rows_results)
            
        exact_match_query = f"SELECT * FROM algorithms WHERE NAME='{search_query}' OR INFO='{search_query}'"
        exact_match_results = execute_query(exact_match_query, connection)
        if exact_match_results is None:
            logging.error("Error: Query execution returned null results.")
            return jsonify(message="An error occurred during the search."), 500
        
        if exact_match_results:
            return jsonify(results=exact_match_results)

        search_words = search_query.split()
        for word in search_words:
            word_query = f"SELECT * FROM algorithms WHERE NAME LIKE '%{word}%' OR INFO LIKE '%{word}%'"
            word_results = execute_query(word_query, connection)
            if word_results is None:
                logging.error("Error: Query execution returned null results for word: %s.", word)
                return jsonify(message="An error occurred during the search."), 500
            if word_results:
                return jsonify(results=word_results)

        return jsonify(message=f"Sorry, we couldn't find any results for '{search_query}'.")
    except Exception as e:
        logging.exception("An unexpected error occurred: %s", e)  # Log the full exception traceback
        return jsonify(message="An unexpected error occurred"), 500


if __name__ == '__main__':
    app.run(debug=True)
