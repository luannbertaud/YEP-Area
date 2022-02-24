
# Action REAction

  

## About

## Usage

### Auth:

  

Native auth:
- email (required)
- firstname (optional)
- lastname (optional)
- password

==IMPORTANT !== Every user using native auth must verifiy their adresse email
<br>

Third parts login:
- google ?
- github ?

  

### Technologies

 WEB
- Archi: SCS
- React
- Van, Pablo

 MOBILE
- Archi: 
- React Native
- Gildas, Baptiste

 SERVER
- Archi: MC
- Python3, PostgreSQL
- Luann


<br><br>

---

*USERS TABLE*
| Id (uuid)  |  Name | Password|Email|googleAuthTokens|{service}Tokens ...|
|:----------:| -----:|--------:|----:|---------------:|------------------:|
| PrimaryKey | !Null |  Null   |!Null|Null            |Null               |
<br>

*WIDGETS TABLE*
| Id (uuid)  |Family          |Type                    |Args  |Childs     |
|:----------:| --------------:|-----------------------:|-----:|----------:|
| PrimaryKey | Trigger/Action |  Twitter/Discord/...   | JSON |Foreign Key|
<br>

*DBDATA*
| Version  |
|:--------:|
| 0.0.1    |

---
<br><br>

### Docker

  

Service: PostgreSQL
- port: 3306
<br>

Server: Python3
- port: 8080
<br>

Client Web:
- port: 8081
<br>

Client Mobile:
- Job -> Build the apk and put it into the build directory

  

## Services

  

### REQUIRED: 6 Services & 15 Action, Reaction

- Google
- Github
- Twitter
- Discord
- Twitch
- Intra Epitech

### Action (If) WIP:

- Google
- Github
- Twitter
- Discord
- Twitch
- Intra Epitech
  
### Reaction (Then) WIP:

- Google
- Github
- Twitter
- Discord
- Twitch
