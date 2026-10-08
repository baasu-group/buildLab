# Django SMTP test: application form (v4: saves to SQL, email optional)

The same application form as the Node version, but with a Django (Python) backend.
Django has SMTP support built in (`django.core.mail`), so no extra email library is needed.

## Run it
1. Install Python 3.10 or newer: https://python.org
2. Open a terminal in this folder and create a virtual environment:
   ```
   python -m venv venv
   venv\Scripts\activate        (Windows)
   source venv/bin/activate     (Mac / Linux)
   ```
3. Install the packages:
   ```
   pip install -r requirements.txt
   ```
4. Copy `.env.example` to `.env`.
5. Start the server:
   ```
   python manage.py runserver
   ```
6. Open http://localhost:8000, submit the form.

## Step 1: test safely (console mode)
`.env` starts with `EMAIL_MODE=console`. The email is printed in the terminal instead of being sent.
If you see the email text in the terminal, the form and Django code work.

## Step 2: send a real email (SMTP mode)
1. Turn on 2-Step Verification in your Google account.
2. Google Account > Security > App passwords > create one.
3. In `.env` set:
   ```
   EMAIL_MODE=smtp
   EMAIL_HOST_USER=yourname@gmail.com
   EMAIL_HOST_PASSWORD=your-16-char-app-password
   MAIL_TO=yourname@gmail.com
   ```
4. Stop the server (Ctrl + C) and start it again, because `.env` is read at startup.
5. Submit the form. The email arrives in your Gmail (check Spam).

## Files
- `config/settings.py`: the email (SMTP) settings
- `apply/views.py`: receives the form, validates it, sends the email
- `apply/templates/apply/index.html`: the form page
- `.env`: your secrets (never share or upload it)

## Troubleshooting
- `SMTPAuthenticationError 535`: wrong App Password, or 2-Step Verification is off.
- `TimeoutError` / `ConnectionRefused`: no internet, or the port is blocked.
  Try `EMAIL_PORT=587` with `EMAIL_USE_SSL=false`.
- `403 CSRF verification failed`: reload the page, then submit again.

## Using it with your BuildLab website (separate static site)
Keep this folder OUTSIDE your website folder, for example:

    projects/
    |-- buildLab/        (your website: index.html, styles.css, script.js)
    `-- smtp-django/     (this Django project)

1. Start Django on port 8001:   python manage.py runserver 8001
2. Start your website on 8000 (inside the website folder):   python -m http.server 8000
3. In the website's script.js set:
       const SCRIPT_URL = "http://localhost:8001/api/apply-public/";
4. Open http://localhost:8000, submit the popup form.
   The allowed website addresses are listed in ALLOWED_ORIGINS in config/settings.py.

## Check you are running THIS version
With the server running, open http://localhost:8001/api/apply-public/ in a browser.
You must see: {"ok": true, "status": "apply API v2 is running"}
A 404 page means you are running an older copy of the project.

## v3: what is new
- Every application is **saved to a database** (SQLite file `db.sqlite3`).
- You can view and manage them in the **Django admin** at http://localhost:8001/admin/
- The team gets a **styled HTML email**, and the applicant gets a **confirmation email**.
- `python manage.py test` runs the included tests.

### One-time setup for the database and admin
    python manage.py migrate
    python manage.py createsuperuser

(createsuperuser asks for a username, email and password. This is your admin login.)

### Daily use
    python manage.py runserver 8001
Submit the form, then open http://localhost:8001/admin/ and log in. Applications appear under
"Applications". You can change the Status straight from the list.

### If an email fails
The application is still saved. The Django terminal prints the error, and the
"Team emailed" / "Confirmation sent" columns in the admin show False.

## v4: save to SQL, email is optional
- Applications are saved to the SQL database table `apply_application` (file `db.sqlite3`).
- Email is OFF by default (`EMAIL_ENABLED=false` in `.env`). Nothing is sent, nothing can fail.
- When you get a Gmail App Password: set `EMAIL_ENABLED=true`, `EMAIL_MODE=smtp` and the Gmail values, then restart.
- In the admin, select rows and use "Export selected applications as CSV" (opens in Excel / Google Sheets).

### Look at the SQL yourself
    python manage.py sqlmigrate apply 0001      shows the CREATE TABLE statement Django ran
    python manage.py shell                      then:
        from apply.models import Application
        Application.objects.all()                       (like SELECT * FROM apply_application)
        Application.objects.filter(track="QA Engineer") (like WHERE track = 'QA Engineer')
        Application.objects.count()                     (like SELECT COUNT(*) ...)
To browse the file directly, open db.sqlite3 with the free "DB Browser for SQLite".
