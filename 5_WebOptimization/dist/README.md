## Website Performance Optimization portfolio project

The project's goal was to optimize the online portfolio for speed. In particular, optimize the critical rendering path and make the page render as quickly as possible by applying the techniques I picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

### Getting started

#### Running the project on your local browser
1. Clone the Repo or download it as a zip
2. Open the index.html on your preferred browser  

#### Making the project accessible remotely
1. Clone the Repo or download it as a zip
2. Run a local server

```bash
$> cd /path/to/your-project-folder
$> python -m SimpleHTTPServer 8080
```
Note if your using python 3 use
```bash
$> python -m http.server 8080
```

3. Open a browser and visit localhost:8080
4. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

``` bash
$> cd /path/to/your-project-folder
$> ./ngrok http 8080
```

5. Copy the public URL that ngrok gives you and paste it in your browser or feel free to share it!

### Optimizations

#### Part 1: Optimize PageSpeed Insights score for index.html

* Minified HTML, CSS, and Javascript (with atom package)
* Resized Images using Image Magick
```bash
convert pizzeria.png -resize 50% pizzeria_small.png
```
* Optimized Images using ImageOptim (IOS APP)
* Used Media Queries to prevent CSS Render Blocking
* Google's Web Font Loader was used
* async was used in script tags
* Some script tags were moved to the bottom of the html

#### Part 2: Optimize Frames per Second in pizza.html

* Minified HTML, CSS, and Javascript (with atom package)
* Resized Images using Image Magick (Must be in the directory + Example bash command below)
```bash
convert pizzeria.png -resize 50% pizzeria_small.png
```
* Optimized Images using ImageOptim (IOS APP)
* In order to optimize I used Chrome developer tools to record and view FPS
* Made changes to UpdatePosition() and changePizzaSizes() in views/js/main.js
...Changed  querySelectorAll to getElementsByClassName, amount of phases iterated are decreased, etc


### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>
