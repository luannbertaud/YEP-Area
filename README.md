[![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/cmzi.svg)](https://yep-area.betteruptime.com/) `Server:` https://api.yep-area/
<br>
[![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/cqz8.svg)](https://yep-area.betteruptime.com/) `UI:` https://yep-area.cf
<br>
![Containers](https://github.com/luannbertaud/YEP-Area/actions/workflows/Build.yml/badge.svg)<br>
![Mirror](https://github.com/luannbertaud/YEP-Area/actions/workflows/mirror.yml/badge.svg)

# Action REAction

## About

This is the Area: Epitech year ead project, of Gildas Gonzalez, Baptiste Renouf, Van Hoang, Pablo Etienne and Luann Bertaud.
The goal of this project is to implement a system of actions and reactions triggered by different services and APIs.

## Deployment

All this project can be manage with [docker-compose](https://docs.docker.com/compose/).  
In order to pass your API keys to the container you can use a `.env` file, at the root of the repository. Here in [an example](.env.example).
Also if you enable the `SERV_ENABLE_SSL` please provide the `fullchain.pem` (cert) and `privkey.pem` (key) files in `api/certificates` and `web/certificates`. In this case the server/web will only respond to https requests.
<br>
Then to start the containers simply run `docker-compose up`.
/!\ If you decide to not start either the `server` or  `web` container, be sure to update the [nginx conf](nginx/nginx.conf) file for the reverse proxy. Also you can update this file to fit your dns.
<br>
[![](https://mermaid.ink/img/pako:eNqFkD1vgzAQQP_KyXOglZKhQg1SCMnSqkJk6AAMBz7AirGpbdqgKP-9Tr-kdulNJ917b7gzazQnFrFW6remR-PgMS8V-NnEmTbOwt3tzWq1rOB-vY4h-bwlxVMn1AlyeiVjCTKjT7NHggBwFOFMY4CGMGxaCIIY0iKbXa_VEvYS7REOZLxX_dv629kWOWHj4Jnq342tx0MP7IpkEpLDoGshCTbZAzRaORTqB02v5Rj2Raat6wzZFwn2owUcHdZoqWILNpAZUHD_mfPVK5nraaCSRX7laI4lK9XFc9PoLdpx4bRhUYvS0oLh5PRhVg2LnJnoG0oFdgaHL-ryDrvpeuE)](https://mermaid.live/edit#pako:eNqFkD1vgzAQQP_KyXOglZKhQg1SCMnSqkJk6AAMBz7AirGpbdqgKP-9Tr-kdulNJ917b7gzazQnFrFW6remR-PgMS8V-NnEmTbOwt3tzWq1rOB-vY4h-bwlxVMn1AlyeiVjCTKjT7NHggBwFOFMY4CGMGxaCIIY0iKbXa_VEvYS7REOZLxX_dv629kWOWHj4Jnq342tx0MP7IpkEpLDoGshCTbZAzRaORTqB02v5Rj2Raat6wzZFwn2owUcHdZoqWILNpAZUHD_mfPVK5nraaCSRX7laI4lK9XFc9PoLdpx4bRhUYvS0oLh5PRhVg2LnJnoG0oFdgaHL-ryDrvpeuE)

If you want to try the REST API by only starting the `server` container, [here is](api/postman-collection/Area.postman_collection.json) a postman collection containing some requests.
And you can find the REST API documentation [here](https://app.swaggerhub.com/apis-docs/luannbertaud/Area/0.3).

## Usage

### Authentication:

You can register or login into the Area in two different ways.

Native auth:
- email (required)
- firstname (optional)
- lastname (optional)
- password

Third parts login: google

### Services subscription

The `services` page allows you to authorize different services that will provide you several Actions or Reactions.

- Github:
	* GithubWebhook (push), GithubWorkflowFailed, GithubNewPullRequest
	* GithubCreateIssue
- Google:
	* GmailWebhook (new email)
	* GmailSendEmail
- Spotify:
	* SpotifyTrackChangeWebhook, SpotifyMonthArtistChangeWebhook (top month artist)
	* SpotifyNext, SpotifyPlay (select a song)
- Twitter:
	* TwitterTweet
- Discord:
	* DiscordMessageReceived (on server)
	* DiscordMessage (send message)
- Epitech:
	* EpitechNotifWebhook
- Custom:
	* CustomPost (send payload to your endpoint)

### Flow creation

After authorizing some services, you will be able to select some Applets to construct a flow.
Some Applets may need to be configured at creation: for example for a GithubNewPullRequest you must provide the `owner` of the `repository` in order to allow the Area to monitor the right repository.
After being created, each flow can be disable if needed.

## Specs


1. WEB
	* Architecture: SCS
	* Technologie: React
	* Served on: 8081
	* Developpers: Van, Pablo

2. MOBILE
	* Architecture: SCS
	* Technologie: React Native
	* Build: Put the apk in web shared volume
	* Developpers: Gildas, Baptiste

3. SERVER
	* Architecture: MC
	* Technologie: Python3
	* Served on: 8080
	* Developper: Luann

3. DATABASE
	* Architecture: *see table scheme below*
	* Technologie: Postgresql
	* Served on: 5432
	* Developper: Luann
  
  ---

*USERS TABLE*
| Uuid       | Name      | Password                           |Email                 |googleToken   |oauth|
|:----------:|:---------:|:----------------------------------:|:--------------------:|:------------------:|:------------------:|
| PrimaryKey | User name | User password (if not googleLogin) |User email if provided|GoogleLogin token (null if native auth)|Authenticated service tokens |

<br>

*ACTIONS TABLE*
| Uuid             | Title             | Description             |Type                                                                       | User uuid                   | Enabled | Content | Children  
|:--------------:| :------------:|:----------------------:|:-----------------------------------------------------:|:------------------------:|:----------:|:--:|:--:|
| PrimaryKey | Action Title | Action Description | Area Action Type (ex: GithubNewPullRequest) |Uuid of action owner| Action state | Action parameters | Reactions to trigger

<br>

*REACTIONS TABLE*
| Uuid             | Title             | Description             |Type                                                                       | User uuid                   | Enabled | Content 
|:--------------:| :------------:|:----------------------:|:-----------------------------------------------------:|:------------------------:|:----------:|:--:|
| PrimaryKey | Reaction Title | Reaction Description | Area Reaction Type (ex: GithubCreateIssue) |Uuid of reaction owner| Reaction state | Reaction parameters

<br>

*DBDATA TABLE*
| Version |
|:--------:|
| Version of database (For migration purposes) |

<br>

---
* [<img src="https://avatars.githubusercontent.com/u/60897185?s=32&v=4" alt="drawing" width="32" height="32"/>](https://github.com/GildasGonz) Gildas Gonzalez
* [<img src="https://avatars.githubusercontent.com/u/61425306?s=32&v=4" alt="drawing" width="32" height="32"/>](https://github.com/Tsaef) Baptiste Renouf
* [<img src="https://avatars.githubusercontent.com/u/71327635?s=32&v=4" alt="drawing" width="32" height="32"/>](https://github.com/VHoang01) Van Hoang
* [<img src="https://avatars.githubusercontent.com/u/72010893?s=32&v=4" alt="drawing" width="32" height="32"/>](https://github.com/LaCabesa) Pablo Etienne
* [<img src="https://avatars.githubusercontent.com/u/60100363?s=32&v=4" alt="drawing" width="32" height="32"/>](https://github.com/luannbertaud) Luann Bertaud


