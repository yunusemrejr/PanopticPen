from flask import Blueprint, request, jsonify
import json  # Import the json module

suggest_keywords = Blueprint('suggest_keywords', __name__)

# Load keyword suggestions from the JSON file
with open('keywords.json', 'r') as keywords_file:
    keyword_suggestions = json.load(keywords_file)

ALLOWED_ORIGINS = ['http://panopticpen.space', 'https://panopticpen.space','https://www.panopticpen.space','http://www.panopticpen.space','https://panopticpen.gor.bio','https://panopticpen.space.gor.bio']

@suggest_keywords.route('/suggest')
def suggest_keywords_route():
    referer = request.headers.get('Referer')
    if referer and any(referer.startswith(origin) for origin in ALLOWED_ORIGINS):
        keyword = request.args.get('keyword', '')
        suggestions =[]

        if keyword in keyword_suggestions:
            suggestions = keyword_suggestions[keyword]
        else:
            for category, keywords in keyword_suggestions.items():
                if keyword == category or keyword in keywords:
                    suggestions.extend(keywords)
                    break
                     
                
            else:
             suggestions = ['sorry, nothing found. Try these categories: <b>food, programming, technology</b> or <a href="#" onclick="viewcateglist(dataHolder)" style="color:lightblue">view list of categories</a>.']

        response = jsonify({'suggestions': suggestions})
        return response
    else:
        return 'Unauthorized', 403



