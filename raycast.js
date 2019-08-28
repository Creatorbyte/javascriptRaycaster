const TILE_SIZE = 24;
const MAP_NUM_ROWS = 23;//20
const MAP_NUM_COLS = 23;//21

const WINDOW_WIDTH = MAP_NUM_COLS * TILE_SIZE;
const WINDOW_HEIGHT = MAP_NUM_ROWS * TILE_SIZE;

const FOV_ANGLE = 60 * (Math.PI / 180);

const WALL_STRIP_WIDTH = 1;
const NUM_RAYS = WINDOW_WIDTH / WALL_STRIP_WIDTH;
const CONST_MINIMAP_SCALE_FACTOR = 0.25;
var MINIMAP_SCALE_FACTOR = 1;

var markerx = 0;
var markery = 0;

class Map {
    constructor() {
		this.grid = [
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,-1],
            [-1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,-1],
			[-1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,-1],
			[-1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,-1],
			[-1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,-1],
			[-1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1,-1],
			[-1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 3, 0, 3, 1, 1, 1, 0, 0, 0, 0, 0, 1,-1],
			[-1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,-1],
			[-1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1,-1],
			[-1, 1, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 1,-1],
			[-1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,-1],
			[-1, 1, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 1,-1],
			[-1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1,-1],
			[-1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,-1],
			[-1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 3, 0, 3, 1, 1, 1, 0, 0, 0, 0, 0, 1,-1],
			[-1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1,-1],
			[-1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,-1],
			[-1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,-1],
			[-1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,-1],
			[-1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,-1],
			[-1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
        ];
		/*
        this.grid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 0, 3, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 1],
            [1, 1, 1, 1, 3, 3, 3, 0, 3, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 1],
            [1, 0, 3, 0, 0, 0, 3, 0, 3, 0, 2, 0, 2, 0, 2, 2, 2, 0, 2, 0, 1],
            [1, 0, 3, 0, 3, 0, 3, 0, 3, 0, 2, 0, 2, 2, 2, 0, 2, 0, 2, 0, 1],
            [1, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 2, 0, 0, 0, 1],
            [1, 0, 3, 0, 3, 3, 3, 3, 3, 2, 2, 0, 2, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 3, 3, 3, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 3, 0, 0, 0, 0, 1],
            [1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1],
            [1, 0, 3, 3, 3, 0, 0, 0, 1, 0, 3, 0, 2, 1, 0, 1, 0, 2, 0, 2, 1],
            [1, 0, 0, 0, 3, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 2, 0, 2, 0, 1],
            [1, 0, 3, 0, 3, 3, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 3, 3, 3, 0, 3, 2, 1, 1, 1, 2, 0, 2, 0, 0, 1],
            [1, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];*/
    }
    getWallContentAt(x, y) {
        if (x < 0 || x > WINDOW_WIDTH || y < 0 || y > WINDOW_HEIGHT) {
            return 1;
        }
        var mapGridIndexX = Math.floor(x / TILE_SIZE);
        var mapGridIndexY = Math.floor(y / TILE_SIZE);
        return this.grid[mapGridIndexY][mapGridIndexX];
    }
  
	 setWallContentAt(x,y,c){
		if(this.getWallContentAt(x,c) !=null) {
			var xn = Math.floor(x / TILE_SIZE);
			var yn = Math.floor(y / TILE_SIZE);
			this.grid[yn][xn]=c;
		}
	 }
  
    render() {
        for (var i = 0; i < MAP_NUM_ROWS; i++) {
            for (var j = 0; j < MAP_NUM_COLS; j++) {
                var tileX = j * TILE_SIZE;
                var tileY = i * TILE_SIZE;
				var tileColor;
				if( this.grid[i][j] != 0 ){
                 tileColor = this.grid[i][j] != 1 ? "#00B": "#00F";
				} else {
					 var tileColor = "#000"
				}
                stroke("#222");
        //noStroke();
                fill(tileColor);
                rect(
                    MINIMAP_SCALE_FACTOR * tileX,
                    MINIMAP_SCALE_FACTOR * tileY,
                    MINIMAP_SCALE_FACTOR * TILE_SIZE,
                    MINIMAP_SCALE_FACTOR * TILE_SIZE
                );
            }
        }
    }
}

class Player {
    constructor() {
        this.x = WINDOW_WIDTH / 2;//19
        this.y = WINDOW_HEIGHT / 2;//19
        this.radius = 7;
        this.turnDirection = 0; // -1 if left, +1 if right
        this.walkDirection = 0; // -1 if back, +1 if front
        this.rotationAngle = Math.PI / 2;
        this.moveSpeed = 3.0;
        this.rotationSpeed = 5 * (Math.PI / 180);
        this.breakNearestBlock = 0;
    }
    update() {
        this.rotationAngle += this.turnDirection * this.rotationSpeed;

        var moveStep = this.walkDirection * this.moveSpeed;

        var newPlayerX = this.x + Math.cos(this.rotationAngle) * moveStep;
        var newPlayerY = this.y + Math.sin(this.rotationAngle) * moveStep;

        if (grid.getWallContentAt(newPlayerX, newPlayerY) == 0) {
            this.x = newPlayerX;
            this.y = newPlayerY;
        }
    }
    render() {
        noStroke();
        fill(255,0,0);
        circle(
            MINIMAP_SCALE_FACTOR * this.x,
            MINIMAP_SCALE_FACTOR * this.y,
            MINIMAP_SCALE_FACTOR * this.radius
        );
        stroke(255,0,0);
        line(
            MINIMAP_SCALE_FACTOR * this.x,
            MINIMAP_SCALE_FACTOR * this.y,
            MINIMAP_SCALE_FACTOR * (this.x + Math.cos(this.rotationAngle) * 30),
            MINIMAP_SCALE_FACTOR * (this.y + Math.sin(this.rotationAngle) * 30)
        );
    }
}

class Ray {
    constructor(rayAngle) {
        this.rayAngle = normalizeAngle(rayAngle);
        this.wallHitX = 0;
        this.wallHitY = 0;
        this.distance = 0;
        this.wasHitVertical = false;
        this.hitWallColor = 0;
		this.Id = 0;

        this.isRayFacingDown = this.rayAngle > 0 && this.rayAngle < Math.PI;
        this.isRayFacingUp = !this.isRayFacingDown;

        this.isRayFacingRight = this.rayAngle < 0.5 * Math.PI || this.rayAngle > 1.5 * Math.PI;
        this.isRayFacingLeft = !this.isRayFacingRight;
    }
    cast(columnId) {
        var xintercept, yintercept;
        var xstep, ystep;

        //HORIZONTAL RAY-GRID INTERSECTION
		
        var foundHorzWallHit = false;
        var horzWallHitX = 0;
        var horzWallHitY = 0;
        var horzWallColor = 0;
		this.Id = columnId;
        // Find the y-coordinate of the closest horizontal grid intersenction
        yintercept = Math.floor(player.y / TILE_SIZE) * TILE_SIZE;
        yintercept += this.isRayFacingDown ? TILE_SIZE : 0;

        // Find the x-coordinate of the closest horizontal grid intersection
        xintercept = player.x + (yintercept - player.y) / Math.tan(this.rayAngle);

        // Calculate the increment xstep and ystep
        ystep = TILE_SIZE;
        ystep *= this.isRayFacingUp ? -1 : 1;

        xstep = TILE_SIZE / Math.tan(this.rayAngle);
        xstep *= (this.isRayFacingLeft && xstep > 0) ? -1 : 1;
        xstep *= (this.isRayFacingRight && xstep < 0) ? -1 : 1;

        var nextHorzTouchX = xintercept;
        var nextHorzTouchY = yintercept;

        // Increment xstep and ystep until we find a wall
        while (nextHorzTouchX >= 0 && nextHorzTouchX <= WINDOW_WIDTH && nextHorzTouchY >= 0 && nextHorzTouchY <= WINDOW_HEIGHT) {
            var wallGridContent = grid.getWallContentAt(nextHorzTouchX, nextHorzTouchY - (this.isRayFacingUp ? 1:0));
            if (wallGridContent != 0) {
                foundHorzWallHit = true;
                horzWallHitX = nextHorzTouchX;
                horzWallHitY = nextHorzTouchY;
                horzWallColor = wallGridContent;
                break;
            } else {
                nextHorzTouchX += xstep;
                nextHorzTouchY += ystep;
            }
        }

        //VERTICAL RAY-GRID INTERSECTION
		
        var foundVertWallHit = false;
        var vertWallHitX = 0;
        var vertWallHitY = 0;
        var vertWallColor = 0;

        // Find the x-coordinate of the closest vertical grid intersenction
        xintercept = Math.floor(player.x / TILE_SIZE) * TILE_SIZE;
        xintercept += this.isRayFacingRight ? TILE_SIZE : 0;

        // Find the y-coordinate of the closest vertical grid intersection
        yintercept = player.y + (xintercept - player.x) * Math.tan(this.rayAngle);

        // Calculate the increment xstep and ystep
        xstep = TILE_SIZE;
        xstep *= this.isRayFacingLeft ? -1 : 1;

        ystep = TILE_SIZE * Math.tan(this.rayAngle);
        ystep *= (this.isRayFacingUp && ystep > 0) ? -1 : 1;
        ystep *= (this.isRayFacingDown && ystep < 0) ? -1 : 1;

        var nextVertTouchX = xintercept;
        var nextVertTouchY = yintercept;

        // Increment xstep and ystep until we find a wall
        while (nextVertTouchX >= 0 && nextVertTouchX <= WINDOW_WIDTH && nextVertTouchY >= 0 && nextVertTouchY <= WINDOW_HEIGHT) {
            var wallGridContent = grid.getWallContentAt(nextVertTouchX - (this.isRayFacingLeft ? 1:0), nextVertTouchY);
            if (wallGridContent != 0) {
                foundVertWallHit = true;
                vertWallHitX = nextVertTouchX;
                vertWallHitY = nextVertTouchY;
                vertWallColor = wallGridContent;
                break;
            } else {
                nextVertTouchX += xstep;
                nextVertTouchY += ystep;
            }
        }

        // Calculate both horizontal and vertical distances and choose the smallest value
        var horzHitDistance = (foundHorzWallHit)
            ? distanceBetweenPoints(player.x, player.y, horzWallHitX, horzWallHitY)
            : Number.MAX_VALUE;
        var vertHitDistance = (foundVertWallHit)
            ? distanceBetweenPoints(player.x, player.y, vertWallHitX, vertWallHitY)
            : Number.MAX_VALUE;

        // only store the smallest of the distances
        if (vertHitDistance < horzHitDistance) {
            this.wallHitX = vertWallHitX;
            this.wallHitY = vertWallHitY;
            this.distance = vertHitDistance;
            this.hitWallColor = vertWallColor;
            this.wasHitVertical = true;
        } else {
            this.wallHitX = horzWallHitX;
            this.wallHitY = horzWallHitY;
            this.distance = horzHitDistance;
            this.hitWallColor = horzWallColor;
            this.wasHitVertical = false;
        }
   
	  
      if(this.Id == Math.floor(NUM_RAYS/2) && player.breakNearestBlock != 0){
		console.log("tried to change")
		
		if(player.breakNearestBlock == 1 && grid.getWallContentAt(this.wallHitX+(2)*cos(this.rayAngle), this.wallHitY+(2)*sin(this.rayAngle))!=-1){
			grid.setWallContentAt(this.wallHitX+(2)*cos(this.rayAngle), this.wallHitY+(2)*sin(this.rayAngle),0);
		}else if(player.breakNearestBlock == 2){
			grid.setWallContentAt(this.wallHitX-(2)*cos(this.rayAngle), this.wallHitY-(2)*sin(this.rayAngle),3);
		} else if(player.breakNearestBlock == 3){
			grid.setWallContentAt(this.wallHitX+(2)*cos(this.rayAngle), this.wallHitY+(2)*sin(this.rayAngle),3);
		}
        player.breakNearestBlock = 0;
      }
    
    }
    render() {
		if(ray.Id != Math.floor(NUM_RAYS/2)) {
			
			stroke("rgba(255, 255, 0, 0.025)");
			line(  
				MINIMAP_SCALE_FACTOR * player.x,
				MINIMAP_SCALE_FACTOR * player.y,
				MINIMAP_SCALE_FACTOR * this.wallHitX,
				MINIMAP_SCALE_FACTOR * this.wallHitY
			);
		} else {
			console.log(""+ray.Id);
			//strokeWeight(2);
			stroke(0, 255, 0);
			
			line(
				MINIMAP_SCALE_FACTOR * player.x,
				MINIMAP_SCALE_FACTOR * player.y,
				MINIMAP_SCALE_FACTOR * this.wallHitX,
				MINIMAP_SCALE_FACTOR * this.wallHitY
			);
			
			circle(
				MINIMAP_SCALE_FACTOR * this.wallHitX,
				MINIMAP_SCALE_FACTOR * this.wallHitY,
				MINIMAP_SCALE_FACTOR * 5
			);
		}
    }
}

var grid = new Map();
var player = new Player();
var rays = [];

function normalizeAngle(angle) {
    angle = angle % (2 * Math.PI);
    if (angle < 0) {
        angle = (2 * Math.PI) + angle;
    }
    return angle;
}

function keyPressed() {
    if (keyCode == UP_ARROW) {
        player.walkDirection = +1;
    } else if (keyCode == DOWN_ARROW) {
        player.walkDirection = -1;
    } else if (keyCode == RIGHT_ARROW) {
        player.turnDirection = +1;
    } else if (keyCode == LEFT_ARROW) {
        player.turnDirection = -1;
    }
  if(keyCode == 90){
    player.breakNearestBlock = 1;
  } else if(keyCode == 88){
    player.breakNearestBlock = 2;
  }else if(keyCode == 67){
    player.breakNearestBlock = 3;
  }
  
  if(keyCode == 77){
	  if(MINIMAP_SCALE_FACTOR == 1){
		  MINIMAP_SCALE_FACTOR = CONST_MINIMAP_SCALE_FACTOR;
	  } else if(MINIMAP_SCALE_FACTOR == CONST_MINIMAP_SCALE_FACTOR){
		  MINIMAP_SCALE_FACTOR = 0;
	  } else if(MINIMAP_SCALE_FACTOR == 0 ){
		  MINIMAP_SCALE_FACTOR = 1;
	  }
  }
}

function keyReleased() {
    if (keyCode == UP_ARROW) {
        player.walkDirection = 0;
    } else if (keyCode == DOWN_ARROW) {
        player.walkDirection = 0;
    } else if (keyCode == RIGHT_ARROW) {
        player.turnDirection = 0;
    } else if (keyCode == LEFT_ARROW) {
        player.turnDirection = 0;
    }
}

function castAllRays() {
    var columnId = 0;

    // start first ray subtracting half of the FOV
    var rayAngle = player.rotationAngle - (FOV_ANGLE / 2);

    rays = [];

    // loop all columns casting the rays
    for (var i = 0; i < NUM_RAYS; i++) {
        var ray = new Ray(rayAngle);
        ray.cast(i);
        rays.push(ray);

        rayAngle += FOV_ANGLE / NUM_RAYS;
        columnId++;
    }
}

function render3DProjectedWalls() {
    // loop every ray in the array of rays
    for (var i = 0; i < NUM_RAYS; i++) {
        var ray = rays[i];

        // get the perpendicular distance to the wall to fix fishbowl distortion
        var correctWallDistance = ray.distance * Math.cos(ray.rayAngle - player.rotationAngle);

        // calculate the distance to the projection plane
        var distanceProjectionPlane = (WINDOW_WIDTH / 2) / Math.tan(FOV_ANGLE / 2);

        // projected wall height
        var wallStripHeight = (TILE_SIZE / correctWallDistance) * distanceProjectionPlane;

        // compute the transparency based on the wall distance
        var alpha = 200 / correctWallDistance;


    if(ray.wasHitVertical) {
        // set the correct color based on the wall hit grid content (1=Red, 2=Green, 3=Blue)
        var colorR =  ray.hitWallColor == -1 ? 200 : ray.hitWallColor == 1 ? 0 : ray.hitWallColor == 2 ? 0 : ray.hitWallColor == 3 ? 0 : 255;
        var colorG =  ray.hitWallColor == -1 ? 0 : ray.hitWallColor == 1 ? 0 : ray.hitWallColor == 2 ? 0 : ray.hitWallColor == 3 ? 0 : 255;
        var colorB =  ray.hitWallColor == -1 ? 0 : ray.hitWallColor == 1 ? 200 : ray.hitWallColor == 2 ? 180 : ray.hitWallColor == 3 ? 160 : 255;
        } else {
      
        var colorR =  ray.hitWallColor == -1 ? 180 : ray.hitWallColor == 1 ? 0 : ray.hitWallColor == 2 ? 0 : ray.hitWallColor == 3 ? 0 : 255;
        var colorG =  ray.hitWallColor == -1 ? 0 : ray.hitWallColor == 1 ? 0 : ray.hitWallColor == 2 ? 0 : ray.hitWallColor == 3 ? 0 : 255;
        var colorB =  ray.hitWallColor == -1 ? 0 : ray.hitWallColor == 1 ? 190 : ray.hitWallColor == 2 ? 170 : ray.hitWallColor == 3 ? 150 : 255;
      
    }

	noStroke();
    fill(0,0,60);
    rect(
           (i) * WALL_STRIP_WIDTH,
           (WINDOW_HEIGHT / 2) + (wallStripHeight/2),
           WALL_STRIP_WIDTH,
           WINDOW_HEIGHT
        );
    
    fill(0,0,0);
    rect(
           (i) * WALL_STRIP_WIDTH,
           0,
           WALL_STRIP_WIDTH,
           (WINDOW_HEIGHT / 2) + (wallStripHeight/2)
        );
	
	fill("rgba(" + colorR + ", " + colorG + ", " + colorB + ", " + alpha + ")");
    
        
        
        // render a rectangle with the calculated wall height
        rect(
           (i) * WALL_STRIP_WIDTH,
           (WINDOW_HEIGHT / 2) - (wallStripHeight / 2),
           WALL_STRIP_WIDTH,
           wallStripHeight
        );
    
    }
}

function normalizeAngle(angle) {
    angle = angle % (2 * Math.PI);
    if (angle < 0) {
        angle = (2 * Math.PI) + angle;
    }
    return angle;
}

function distanceBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function setup() {
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
}

function update() {
    player.update();
    castAllRays();
}

function draw() {
    background("#111");
    update();

    render3DProjectedWalls();

    grid.render();
    for (ray of rays) {
        ray.render();
    }
    player.render();

}
