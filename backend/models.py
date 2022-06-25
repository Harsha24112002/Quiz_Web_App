from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Questions(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	question = db.Column(db.Text, nullable=False)
	answer = db.Column(db.Text, nullable=False)

	def __init__(self,question,answer):
		self.question = question
		self.answer = answer
	def __repr__(self):
		return f"{self.question}"

	def format(self):
		return {
			"question":self.question,
			"id": self.id
		}