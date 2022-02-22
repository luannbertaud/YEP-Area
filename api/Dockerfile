FROM python:3.8
WORKDIR /app
COPY . .

RUN pip3 install -r requirements.txt --disable-pip-version-check
ENV PYTHONUNBUFFERED=1
ENV FLASK_APP="/app/app:app"
EXPOSE 5000

CMD ["python3", "-m", "flask", "run", "--host", "0.0.0.0", "--cert=/app/certificates/fullchain.pem", "--key=/app/certificates/privkey.pem"]