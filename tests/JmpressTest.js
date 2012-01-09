/**
 * jmpress.js test suite
 *
 * MIT Licensed.
 *
 * Copyright 2012 Kyle Robinson Young (@shama)
 */

describe('Jmpress', function() {
	
	var jmpress, settings;
	
	/**
	 * beforeEach
	 */
	beforeEach(function() {
		jmpress = $('<div />').attr('id', 'jmpress');
		jmpress.append( $('<div id="impressive" class="step" data-x="-900" data-y="-1500">Slide 1</div>') );
		jmpress.append( $('<div class="step" data-x="0" data-y="0">Slide 2</div>') );
		jmpress.jmpress({
			stepSelector: '.step'
			,canvasClass: 'canvas'
			,notSupportedClass: 'jmpress-not-supported'
			,loadedClass: 'loaded'
			,animation: {
				transformOrigin: 'top left'
				,transitionProperty: 'all'
				,transitionDuration: '1s'
				,transitionTimingFunction: 'ease-in-out'
				,transformStyle: "preserve-3d"
			}
		});
		settings = jmpress.jmpress( 'settings' );
	});
	
	/**
	 * afterEach
	 */
	afterEach(function() {
		jmpress = null;
		settings = null;
	});
	
	/**
	 * test init
	 */
	it('should initialize', function() {
		var result;
		
		// HAVE CANVAS
		result = jmpress.find( '.' + settings.canvasClass );
		expect( result.length ).toEqual( 1 );
		
		// TODO: Check jmpress/canvas style values
		
		// SET INIT VALUES
		jmpress.jmpress({
			canvasClass: 'testcanvas'
			,stepSelector: 'li'
		});
		result = jmpress.jmpress( 'settings' );
		expect( result.canvasClass ).toEqual( 'testcanvas' );
		expect( result.stepSelector ).toEqual( 'li' );
	});
	
	/**
	 * test init slides
	 */
	it('should initialize each slide', function() {
		var slide,
			slides = jmpress.find( settings.stepSelector );
		
		slide = slides.first();
		expect( slide.hasClass('active') ).toBeTruthy();
		expect( slide.attr('style') ).toContain( 'position: absolute;' );
		expect( slide.attr('style') ).toContain( 'translate(-50%, -50%)' );
		expect( slide.attr('style') ).toContain( 'translate3d(-900px, -1500px, 0px)' );
		expect( slide.attr('style') ).toContain( 'scaleX(1) scaleY(1) scaleZ(1)' );
		expect( slide.attr('style') ).toContain( 'preserve-3d' );
		
		// TODO: More extensive tests
	});
	
	/**
	 * test select
	 */
	it('should select a slide', function() {
		var slide;
		
		slide = jmpress.jmpress('select', jmpress.find('#impressive'));
		expect( slide.hasClass('active') ).toBeTruthy();
		
		slide = jmpress.jmpress('select', '#impressive');
		expect( slide.hasClass('active') ).toBeTruthy();
	});
	
	/**
	 * test next
	 */
	it('should select the next slide', function() {
		var slide = jmpress.jmpress('next');
		expect( slide.text() ).toEqual( 'Slide 2' );
	});
	
	/**
	 * test prev
	 */
	it('should select the prev slide', function() {
		var slide = jmpress.jmpress('prev');
		expect( slide.text() ).toEqual( 'Slide 2' );
	});
	
	// TODO: Write test for loadSiblings
	
	/**
	 * test canvas
	 */
	it('should modify the canvas css', function() {
		var canvas = jmpress.jmpress('canvas', {
			transitionTimingFunction: 'linear'
		});
		expect( canvas.attr('style') ).toContain( 'transition-timing-function: linear;' );
	});
	
	// TODO: Test getElementFromUrl, pfx, css, checkSupport
	
	/**
	 * test translate
	 */
	it('should build translate', function() {
		var result = jmpress.jmpress('translate', { x: 500, y: -900, z: 2 });
		expect( result ).toEqual( ' translate3d(500px,-900px,2px) ' );
	});
	
	/**
	 * test rotate
	 */
	it('should build translate', function() {
		var result;
		
		result = jmpress.jmpress('rotate', { x: 90, y: 180, z: 20 }, false);
		expect( result ).toEqual( ' rotateX(90deg)  rotateY(180deg)  rotateZ(20deg) ' );
		
		result = jmpress.jmpress('rotate', { x: 90, y: 180, z: 20 }, true);
		expect( result ).toEqual( ' rotateZ(20deg)  rotateY(180deg)  rotateX(90deg) ' );
	});
	
	/**
	 * test scale
	 */
	it('should build translate', function() {
		var result = jmpress.jmpress('scale', { x: 3, y: 2, z: 1 });
		expect( result ).toEqual( ' scaleX(3) scaleY(2) scaleZ(1) ' );
	});
	
});