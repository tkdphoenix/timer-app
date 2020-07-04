# <timer-app>

This project is a simple timer to help track time spent on projects.

There is no database to record times or projects, but that could be a future implementation. 
Multiple timers can be created at once. Each timer has a Start, a Pause button, a space to type 
a project name, and icons to edit the project name, create a new timer, and delete a timer.

I thought it would be fun to create each timer with different color values so that when a new timer is created it is a random color. To avoid contrast issues, I found a calculation for RGB that sets the color to white if the background color is dark, or sets the color to black if the background color is light. This part of the project was great, because I learned a lot about color theory. Initially I thought about having a random background and then finding a complimentary color, which is typically on the opposite side of the color wheel. While I am sure that there are formulas to find this value I only saw the calculation in HSB values, and I didn't want to go that route. I did come up with asimple calculation that came close, and the color was still complimentary, but may have been outside the colorblind spectrum or other issues, and I decided to go with black or white text as described above.

I had studied color theory before, but theory and practice are two different things 😄. At first I made it much harder than necessary by doing all the manual calculations line by line, as I had done before only to realize I could use `value.toString(16)` to convert an RGB value to a hexidecimal string. Converting hexidecimal values to RGB was easier because I was already aware of the radix property of `Number.parseInt()` and calculations like `Number.parseInt('cf', 16)` were straightforward.

The timers are wrapped in a flexbox container and wrap nicely to a new line when necessary.The different colors look nice on the screen as you create different timers.

Linting is incorporated into this project with ESLint and Prettier. There is also a setup with Husky that runs these tools before allowing the user to commit. There is also a commitlint that requires the developer to create a message in a specific format. If you are familiar with commitlint I used their standard format. The only modification that I made was to allow uppercase words in the subject of the commit message.

## Starting the Project

`npm i`

`npm run start`

## Other scripts

Most of the scripts are straight forward, but I often get asked about my `update` script. I _love_ this script. NPX executes without having to go into the binary directory in node_modules, and instead of running `npm update` and accepting whatever updates are available, the `npm run update` command allows me to see what is available for update and go through the potential updates which are categorized by major, minor, and patch updates. This allows me the time to review and consider a plan for major updates, and also decide on the minor and patch, in case there is some reason I don't want to update a specific package.
