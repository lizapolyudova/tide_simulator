# Project Notes

## Dailies

### 06-08-2023

Working a bit on rotating the earth around its own axis today. Ideally, this is done in a group with the camera, so that the two don't have to be rotated separately. 

I have to come to terms with the fact that this will be a simplified angle-based model not taking actual gravity into account, should be ok. Angles/deltas can afterall be fed in from a more computationally intensive model.

reading [this article](https://rwu.pressbooks.pub/webboceanography/chapter/11-2-dynamic-theory-of-tides/)

Some factual tidbits:

* As the moon orbits the Earth, its orbital plane is at an angle relative to the rotational plane of Earth (specifically, the article sites 28.5 degrees from the equator)
* tides are essentially waves with extremely long wavelength, extending halfway across the earth
* moon does not in fact rotate around the earth; rather, moon and earth rotate around their shared center of mass. The rotating system has inertial force (what is inertial force?!)
* 

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