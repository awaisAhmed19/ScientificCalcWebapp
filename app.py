import os
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(
    __name__,
    static_folder="./FrontEnd/src",
    template_folder="./FrontEnd/src",
)


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)
