from flask import Flask, render_template_string, redirect, request
import requests
from gen_python_bar import python_generator
from gen_php_bar import php_generator

app = Flask(__name__)

@app.route('/')
def render_template():
    template_url = 'https://panopticpen.gor.bio/template.txt'
    
    response = requests.get(template_url)
 
    if response.status_code == 200:
        template_content = response.text
        modified_template = template_content.replace('{@PostDisplayUnit}', '''
            <link rel="stylesheet" href="https://panopticpen.space/searchbar-generator/app.css"/>
            <script src="https://panopticpen.space/searchbar-generator/app.js"></script>
            <h1>Free Searchbar Generator - Have your OWN search bar for your website!</h1>
            <br>
            <div id="search-engine-app-div"></div>
            <br>
            <p>Introducing the Ultimate Online Free Searchbar Generation Tool! <br>
           Unlock the power of a custom searchbar for your blog or website!</p>
        ''')
        modified_template = modified_template.replace('{@headDescriptionMeta}', 'Programmable search engine aka. search bar for your website! Totally free and unlimited!')
        modified_template = modified_template.replace('{@headTitle}', 'Free Unlimited Searchbar Generator')
        modified_template = modified_template.replace('<!--keywords-->', 'searchbars,programmable search engine,custom search,search bar for your blog,search engine')  # Add the replacement value

        return render_template_string(modified_template)


@app.errorhandler(404)
def page_not_found(error):
    error_message = "The page you are looking for does not exist in Panoptic Pen Blog."
    redirect_path = "https://panopticpen.space/searchbar-generator/"
    return redirect(redirect_path, code=302)
    

@app.route('/PHP')
def render_php_template():
    return render_template()

@app.route('/Python')
def render_python_template():
    return render_template()
  
  
  
@app.route('/generate-php', methods=['GET', 'POST'])
def gen_php_bar():
    if request.method == 'POST':
        form_data = request.form
        result = php_generator(form_data)
        return result

    
    
@app.route('/generate-python', methods=['POST'])
def gen_python_bar():
    if request.method == 'POST':
        form_data = request.form
        result = python_generator(form_data)
        return result


    
       
if __name__ == '__main__':
    app.run()
