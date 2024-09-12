from flask import Flask, request, jsonify
import mysql.connector
from flask_mysqldb import MySQL
from flask_mysqldb import MySQL
import MySQLdb.cursors
from werkzeug.security import generate_password_hash
from flask_cors import CORS
from flask_cors import cross_origin
from flask_bcrypt import Bcrypt
app = Flask(__name__)

app.config['MYSQL_HOST']='localhost'
app.config['MYSQL_USER']='root'
app.config['MYSQL_PASSWORD']='aditeesingh_28'
app.config['MYSQL_DB']='e_visit'
mysql=MySQL(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
bcrypt = Bcrypt(app)
@app.route('/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        # Preflight request
        response = app.make_response('')
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "Content-Type,Authorization")
        response.headers.add('Access-Control-Allow-Methods', "GET,POST,OPTIONS")
        return response
    try:
        data = request.get_json()
        PhoneNo = data['PhoneNo']
        userid = data['userid']
        password = data['password']
        
        cur = mysql.connection.cursor()
        query = "INSERT INTO register_visit (PhoneNo, userid, password) VALUES (%s, %s, %s)"
        cur.execute(query, (PhoneNo, userid, password))
        mysql.connection.commit()
        return jsonify({'success': True, 'message': 'User registered successfully'})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'success': False, 'message': 'Error registering user'}), 500
@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        # Preflight request
        response = app.make_response('')
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "Content-Type,Authorization")
        response.headers.add('Access-Control-Allow-Methods', "GET,POST,OPTIONS")
        return response
    
    if request.method == 'POST':
        try:
            data = request.get_json()
            userid = data['userid']
            password = data['password']
            
            cur = mysql.connection.cursor()
            # Query to check if the user exists in the 'register' table and matches the password
            query = "SELECT * FROM register_visit WHERE userid=%s AND password=%s"
            cur.execute(query, (userid, password))
            user = cur.fetchone()
            
            if user:
                # Insert login attempt into 'login' table after successful login
                login_query = "INSERT INTO login_visit (userid, password) VALUES (%s, %s)"
                cur.execute(login_query, (userid,password))
                mysql.connection.commit()  # Commit the transaction

                return jsonify({'success': True, 'message': 'Login successful'})
            else:
                return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({'success': False, 'message': 'Error during login'}), 500


@app.route('/home', methods=['POST', 'OPTIONS'])
def home():
    if request.method == 'OPTIONS':
        # Preflight request
        response = app.make_response('')
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "Content-Type,Authorization")
        response.headers.add('Access-Control-Allow-Methods', "GET,POST,OPTIONS")
        return response

    if request.method == 'POST':
        try:
            data = request.get_json()

            # Print received data for debugging
            print(f"Received data: {data}")

            # Connect to MySQL and insert data
            cur = mysql.connection.cursor()

            query = """
            INSERT INTO user_data(
                firstn, lastn, fathern, dob, gender, bloodgrup,
                mobileno, landline, email, password, address, city, state
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            cur.execute(query, (
                data.get('firstn'),
                data.get('secondn'),
                data.get('fathern'),
                data.get('dob'),
                data.get('gender'),
                data.get('bloodgrup'),
                data.get('mobileno'),
                data.get('landline'),
                data.get('email'),
                data.get('password'),
                data.get('address'),
                data.get('city'),
                data.get('state')
            ))

            # Commit changes
            mysql.connection.commit()
            
            cur.close()

            # Respond with a success message
            return jsonify({
                'success': True,
                'message': 'Profile data received and stored successfully',
                'data': data
            }), 200

        except Exception as e:
            print(f"Error: {e}")
            return jsonify({
                'success': False,
                'message': 'Error processing profile data'
            }), 500

@app.route('/apply_pass',methods=['options','post'])
def apply_pass():
    if request.method == 'OPTIONS':
        # Preflight request
        response = app.make_response('')
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "Content-Type,Authorization")
        response.headers.add('Access-Control-Allow-Methods', "GET,POST,OPTIONS")
        return response
    try:
        # Fetch data from request
        data = request.get_json()
        print(f"Received data: {data}")
        
        # Connect to MySQL and insert data
        cur = mysql.connection.cursor()
        
        query = """
        INSERT INTO applied_passed (
            firstn, lastn, employeename, city, state, email, dateofvisit, timeofvisit, purpose
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cur.execute(query, (
            data.get('firstn'),
            data.get('lastn'),  # Correct field
            data.get('employeename'),
            data.get('city'),
            data.get('state'),
            data.get('email'),
            data.get('dateofvisit'),  # Correct field
            data.get('timeofvisit'),  # Correct field
            data.get('purpose')
        ))

        # Commit changes to MySQL
        mysql.connection.commit()
        cur.close()

        # Respond with a success message
        return jsonify({
            'success': True,
            'message': 'Pass Applied Successfully',
            'data': data
        }), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({
            'success': False,
            'message': 'Error processing profile data'
        }), 500
@app.route('/get_pass/<string:email>', methods=['OPTIONS', 'GET'])
def get_pass(email):
    response = None
    if request.method == 'OPTIONS':
        # Preflight request
        response = app.make_response('')
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "Content-Type,Authorization")
        response.headers.add('Access-Control-Allow-Methods', "GET,POST,OPTIONS")
        return response

    if request.method == 'GET':
        try:
            if not email:
                return jsonify({
                    'success': False,
                    'message': 'Email parameter is required'
                }), 400

            # Connect to MySQL
            cur = mysql.connection.cursor()

            # Query to fetch all applied passes
            query = "SELECT firstn, lastn, employeename, timeofvisit, dateofvisit FROM applied_passed WHERE email = %s"
            cur.execute(query, (email,))

            # Fetch all results
            results = cur.fetchall()
            print(results)

            # Close the cursor
            cur.close()

            if len(results) == 0:
                return jsonify({
                    'success': False,
                    'message': 'No data found for this email'
                }), 404

            # Convert result rows to dictionaries for JSON serialization
            data = []
            for row in results:
                data.append({
                    'firstn': row[0],
                    'lastn': row[1],
                    'employeename': row[2],
                    'timeofvisit': row[3],
                    'dateofvisit': row[4]
                })

            return jsonify({
                'success': True,
                'data': data
            }), 200

        except Exception as e:
            print(f"Error: {e}")
            return jsonify({
                'success': False,
                'message': 'Error fetching data'
            }), 500


if __name__ == "__main__":
    app.run()
