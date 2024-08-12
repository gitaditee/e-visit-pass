from flask import Flask, request, jsonify
import mysql.connector
from werkzeug.security import generate_password_hash
from flask_cors import CORS
 # Enable CORS for all routes

app = Flask(__name__)

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="aditeesingh_28",
    database="e_visit"
)
CORS(app) 
@app.route('/api/profile', methods=['POST'])
def create_profile():
    data = request.form
    photo = request.files['photo'] if 'photo' in request.files else None
    
    cursor = db.cursor()

    sql = """
    INSERT INTO my_profile (FirstName, LastName, FathersName, DOB, Gender, BloodG, MobileN, LandlineN, Email, Password, Address, City, State)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    
    hashed_password = generate_password_hash(data['password'])
    
    cursor.execute(sql, (
        data['first_name'],
        data['second_name'],
        data['father_name'],
        data['date_of_birth'],
        data['gender'],
        data['blood_group'],
        data['mobile_number'],
        data['landline_number'],
        data['email'],
        hashed_password,
        data['address'],
        data['city'],
        data['state']
    ))

    db.commit()
    cursor.close()
    
    return jsonify({"message": "Profile created successfully"}), 201

if __name__ == "__main__":
    app.run(debug=True)
