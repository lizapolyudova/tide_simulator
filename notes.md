# Project Notes

## Current Todos

### Website

- [x] lock down the s3 bucket & figure out permissioning
- [ ] trees with faces - add sketches which show up on top? overlay?
- [ ] audio journaling - model after the syllabus project. make either interactive or make a flow chart. be instructive,
  follow your own instructions.

### Moon Simulation

- [ ] start/pause
- [ ] toggleable printout for all coordinates

- [ ] dynamic controls
- [x] multiple views

- [x] groups rotating correctly; maybe encode all orbiting as rotation around axis instead of angle-based manual
  calculations
- [x] geo-static camera rotates with the earth
- [ ] animation of sunrise/sunset -> almost
- [ ] "lookat" for daily cam, so one can take a look around based on mouse movement
- [ ] day/night cycle

## Dailies

### 04-06-2023

This are going fairly well today! I figured out shadows (mostly by changing all PlaneGeomtery instances into BoxGeometry
instances and configuring the properties accordingly). Current state: I have a working wodel of a house with a roofbox
which creates a visible sun ray inside the house.

Thing to work on:

- [ ] closing the sides of the house / possibly creating the house model in blender instead?
- [ ] getting sun to move along a configurable path, rather than simply going in a
  circle [link](https://dustinpfister.github.io/2022/04/04/threejs-object3d-position/)
- [ ] setting up location of the original camera correctly + possibly not allow to pass through walls?

Parameterization:

- [ ] camera switch: global vs. first person
- [ ] manipulate time? idk. -> have a time control box and allow to input time which sets the sun on the curve
  somewhere (possibly a more difficult feature)
- [ ] better first person control, kinda awkward now

Visual:

- [ ] it would be good to experiment with textures
- [ ] maybe add some furniture to the room (another opportunity to improve with blender)

After that, I believe I should be ready to have a little writeup about my experience / talk about newgrange some more.
Possibly move into making a model for the cave.

### 03-06-2023

Not necessarily moving on to the next project, just going where curiousity takes me. I've been thinking more about
Newgrange and the role tracking the sun might have had for the newly non-nomadic people.

Got a semi-working model of a house which I will then add a roofbox to and start with tracking the sunbeam. Will add a
page on newgrange before I head out for the night, just so I start gathering some thoughts in the same place

### 22-05-2023

Been a while, working on this for a while today. Would like:

* remove "todos" for non-dev build
* change color scheme (ideally, randomize colors?)

### 13-04-2023

Circling back after a bit of a break; much has happened, but also objectively nothing has changed. I did make it to
Dublin successfully *woo*

Pulling data from S3 does not seem to work too well, I think maybe env vars are not successfully pulled into the app
when deployed with Netlify? Would be good to get that working, don't want all data to be publically exposed.

_looking through previous to-do list_

yup, looks like sketch overlays for the trees would be next.

### 29-03-2023

Getting a bit out of control, since this is now becoming just a personal website instead of just a simulation. I might
have to split things up a bit.

That being said, I am currently at https://pacific-snail.netlify.app

Been working on it for the past two days.

### 16-03-2023

Finally got the 2-camera view working today. Gave up on the atmosphere/daily view for now. Moon cam seems to be getting
the job done well enough.

Next up are dynamic controls and start/stop buttons, maybe rewind to make the simulation feel more "inspectable". I also
feel like the orbit controls are not very useful in the main view.

Probably a story for tomorrow. Deployed on netlifiy! woot, live version here:
https://main--tides-simulator.netlify.app/

### 12-03-2023

Sat down to do a bit of writing, ended up getting a bit stuck working on camera angles again. Need to either work this
out on paper or talk to someone.

The problem is more or less that spheres awkwardly float through the sky, but I am not getting "rising" and "setting"
visuals; not sure where that's coming from. It seems counter-intuitive to point the camera tangent to the sphere;
though, likely that's what happening.

The other problem is day/nigh cycle simulation is still not working. (added a demo video with the day/night cycle
actually reversed lol). I tried to experiment with atmosphere colors to compensate for it, but didn't work. Will have to
think of another way of showing that. Specifically:

* material must display its color only when light is passing through it
* must be transparent when not lit.

Found [prisoner 840](https://codepen.io/prisoner849/pens/public?cursor=ZD0xJm89MCZwPTEmdj02Njg2MDAwOQ==) on codepen.
Mildly intrigued how people end up spending so much time/buildling so much expertise in 3js? Demos are beautiful.

Near-future goals added to the todos. I might go for a hike.

### 11-03-2023

Another day, hopefully more progress today!
Everything is packaged into npm now, which is nice since it's easily portable/can be hosted on netlify!

Accomplished most of my todos; went out to the beach at night (before the moonrise at 11pm); so dark and beautiful,
watched the stars for a bit.

Tried to figure out getting atmosphere so that "daytime" is visible. Learnings:

* mesh can be rendered from front back or both sides by setting  `atmosphereMaterial.side = THREE.BackSide;`
* this heled somewhat, together with setting opacity
* however, looking directly at the source of light, the material is entirely transparent
*

### 06-03-2023

Working a bit on rotating the earth around its own axis today. Ideally, this is done in a group with the camera, so that
the two don't have to be rotated separately.

I have to come to terms with the fact that this will be a simplified angle-based model not taking actual gravity into
account, should be ok. Angles/deltas can afterall be fed in from a more computationally intensive model.

reading [this article](https://rwu.pressbooks.pub/webboceanography/chapter/11-2-dynamic-theory-of-tides/)

Some factual tidbits:

* As the moon orbits the Earth, its orbital plane is at an angle relative to the rotational plane of Earth (
  specifically, the article sites 28.5 degrees from the equator)
* tides are essentially waves with extremely long wavelength, extending halfway across the earth
* moon does not in fact rotate around the earth; rather, moon and earth rotate around their shared center of mass. The
  rotating system has inertial force (what is inertial force?!)

Ported the project to npm, since I tried to add
the [axis helper](https://threejs.org/docs/index.html?q=axesh#api/en/helpers/AxesHelper) which turned out to not be
available in the cached version of the library I was using before
npm. [this tutorial](https://sbcode.net/threejs/create-threejs-project/) was extremely helpful.

### 06-03-2023

Starting today, found a [base project](https://mattloftus.github.io/2016/02/03/threejs-p2/) which helped me get setup
with a simple model.

## Project Goals

Long-term idea would be to:

### 1. simple simulation

* simple earth, moon, sun simulation
* bodies are correctly rotating, (all parameters are visible and can be adjusted?)
* gravity is correctly simulated

### 1.5 mathy part

* body of water representing the ocean is correctly squished by the gravitational forces

### 2. enhanced simulation

* point-picker for coastal location, forecast tide there

### 3. sci-fi/speculative mode

* allow user specify # of moons and their locations
* pick a point on earth to forecast tides for the point

## Misc Feature Ideas

- [ ] start/stop button