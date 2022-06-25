from flask import Flask, render_template,request
from flask_sqlalchemy import SQLAlchemy
from models import Questions, db
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@localhost:5432/quiz"
CORS(app)
db.init_app(app)
with app.app_context():
	db.create_all(app=app)


# @app.route('/')
# def hello_world():
# 	return render_template('index.html')

# @app.route('/login',methods=['POST'])
# def login(request):
# 	print(request)
	
@app.route('/get/<id>', methods=['GET'])
def get_q(id):
	print(id)
	# print(request.get_json())
	q = Questions.query.filter_by(id=id).one()
	return q.format()

@app.route('/validate/<id>',methods=['POST'])
def validation(id):
	data = request.get_json()
	q = Questions.query.filter_by(id=id).one()
	print(q)
	if q.answer == data['answer']:
		return 'success'
	else:
		return 'failure'
@app.route('/add', methods=['GET','POST'])
def add():
	if request.method == 'GET':
		questions = Questions.query.all()
		formattedquestions = []
		for question in questions:
			formattedquestions.append(question.format())
		return {
			"questions": formattedquestions
		}
		
	if request.method == 'POST':
		data = request.get_json()
		new_q = Questions(question=data['question'], answer=data['answer'])
		db.session.add(new_q)
		db.session.commit()
		return new_q.format()

@app.route('/delete/<id>',methods=['DELETE'])
def delete(id):
	Questions.query.filter_by(id=id).delete()
	db.session.commit()
	return f'question {id} deleted'

if __name__ == '__main__':
	app.run(debug=True)