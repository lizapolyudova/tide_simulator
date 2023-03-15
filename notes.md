# Project Notes

## Current Todos

- [ ] dynamic controls
- [ ] multiple views

- [x] groups rotating correctly; maybe encode all orbiting as rotation around axis instead of angle-based manual calculations
- [x] geo-static camera rotates with the earth
- [ ] animation of sunrise/sunset -> almost
- [ ] "lookat" for daily cam, so one can take a look around based on mouse movement
- [ ] day/night cycle

## Dailies

### 12-03-2023

Sat down to do a bit of writing, ended up getting a bit stuck working on camera angles again. Need to either work this out on paper or talk to someone.

The problem is more or less that spheres awkwardly float through the sky, but I am not getting "rising" and "setting" visuals; not sure where that's coming from. It seems counter-intuitive to point the camera tangent to the sphere; though, likely that's what happening. 

The other problem is day/nigh cycle simulation is still not working. (added a demo video with the day/night cycle actually reversed lol). I tried to experiment with atmosphere colors to compensate for it, but didn't work. Will have to think of another way of showing that. Specifically:
* material must display its color only when light is passing through it
* must be transparent when not lit.

Found [prisoner 840](https://codepen.io/prisoner849/pens/public?cursor=ZD0xJm89MCZwPTEmdj02Njg2MDAwOQ==) on codepen. Mildly intrigued how people end up spending so much time/buildling so much expertise in 3js? Demos are beautiful.

Near-future goals added to the todos.
I might go for a hike.


### 11-03-2023

Another day, hopefully more progress today!
Everything is packaged into npm now, which is nice since it's easily portable/can be hosted on netlify!

Accomplished most of my todos; went out to the beach at night (before the moonrise at 11pm); so dark and beautiful, watched the stars for a bit. 

Tried to figure out getting atmosphere so that "daytime" is visible. 
Learnings:
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