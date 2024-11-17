from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)
app.secret_key = "your_secret_key"  # Needed if you use sessions

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        name = request.form.get("name")
        travel_purpose = request.form.get("travel_purpose")
        expenses = request.form.getlist("description")
        dates = request.form.getlist("date")
        currencies = request.form.getlist("currency")
        amounts = request.form.getlist("amount")
        attachments = request.files.getlist("attachment")

        # You can process/save the data here or pass it to a new page
        # Redirecting to printable for simplicity
        return render_template("printable.html", 
                               name=name, 
                               travel_purpose=travel_purpose, 
                               expenses=zip(expenses, dates, currencies, amounts, attachments))
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
