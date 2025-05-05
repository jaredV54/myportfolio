from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/hobbies')
def hobbies():
    return render_template('hobbies.html')

@app.route('/profession')
def profession():
    return render_template('profession.html')

@app.route('/food')
def food():
    return render_template('food.html')

@app.route('/milestones')
def milestones():
    return render_template('milestones.html')

if __name__ == '__main__':
    app.run(debug=True)