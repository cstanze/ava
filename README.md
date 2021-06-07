# Ava Source Code
## Documentation doesn't exist so don't ask

If you've been invited follow the next instructions.  
`if (hackedWayIn) return msg.channel.send('have fun with this code, idk what you might use it for.');`  

### Instructions for people who were invited
#### Prerequisites: Computer (It would be great if it wasn't from the 1990s), JavaScript Knowledge, NodeJS 14.2.0 or greater installed, and some Discord.js v12 knowledge.

So, you've been invited. Great! You now have access to all the source code for the Ava discord bot!  
## How to start
Ok. To start off, clone this repo with the following:  
HTTPS:  
`git clone https://github.com/Julz4455/ava.git ava`  

SSH:  
`git clone git@github.com:Julz4455/Ava`  

### Epic Side Quest: Running imgen
Running imgen is super easy and super useful (not really but stfu i don't care).

To prepare to run imgen, install `python3` and `pip` if not already installed. Next, install `pipenv` using `pip` and then navigate into the imgen directory where you should run `pipenv install`. Next, enter the `pipenv` virtual environment by using `pipenv shell`. You should have all dependencies installed and ready to go. But, before running imgen, install [rethinkdb](https://rethinkdb.com/docs/install/) for your distribution of Linux, macOS, or Windows. Next, run `rethinkdb` in a separate terminal session and keep this running as long as imgen is running. Finally, you can run imgen using `gunicorn` or `start.sh` (recommended). To test imgen, you can use this link: `http://localhost:65535/api/boo?text=haha,%20bruh`. **Note:** this doesn't work in Safari because Safari doesn't allow port `65535`.

I'm assuming you have this done. Now, you need to open the Discord.js documentation. This is available here:  
[Discord.JS Documentation](https://discord.js.org/#/docs/main/stable/general/welcome)  

After doing that, await further instructions or work on new commands and fixing bugs. It would be appreciated if you would make Ava more secure.
## Good Luck and Happy Coding!
