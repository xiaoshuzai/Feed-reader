/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */

/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */
$(function() {
    /* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
     * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
    */
    describe('RSS Feeds', function() {
        /* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
         * 不是空的。在你开始做这个项目剩下的工作之前最好实验一下这个测试
         * 比如你把 app.js 里面的 allFeeds 变量变成一个空的数组然后刷新
         * 页面看看会发生什么。
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */

        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
         it('allFeeds',function() {
         	for(var i = 0; i < allFeeds.length; i++){
            expect(allFeeds[i].url).toBeDefined();
            expect(allFeeds[i].url.length).not.toBe(0);
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name.length).not.toBe(0);
         	}
         });

    });


    /* TODO: 写一个叫做 "The menu" 的测试用例 */
    describe('The menu',function(){
        /* TODO:
         * 写一个测试用例保证菜单元素默认是隐藏的。你需要分析 html 和 css
         * 来搞清楚我们是怎么实现隐藏/展示菜单元素的。
         */
         it('菜单元素默认是隐藏的',function() {
         	// body 有 'menu-hidden' 这个 class
         	expect($('body').hasClass('menu-hidden')).toBe(true);
         });
         /* TODO:
          * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
          * 测试应该包含两个 expectation ： 点击图标的时候菜单是否显示，
          * 再次点击的时候是否隐藏。
          */
          it('菜单栏切换',function() {
          	// 设置点击事件，第一次点击,body含有'menu-hidden' class 是否为假
            $('.menu-icon-link').trigger('click');
          	expect($('body').hasClass('menu-hidden')).toBe(false);

          	// 第二次点击,body含有'menu-hidden' class 是否为真
            $('.menu-icon-link').trigger('click');
          	expect($('body').hasClass('menu-hidden')).toBe(true);

          });
    });

    /*储存超时时间，放在外边，方便下边 2 个测试用例均可使用*/
    var timeOut = jasmine.DEFAULT_TIMEOUT_INTERVAL;

    /* TODO: 13. 写一个叫做 "Initial Entries" 的测试用例 */
    describe('Initial Entries',function() {
        /* TODO:
         * 写一个测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
         * 里面至少有一个 .entry 的元素。
         *
         * 记住 loadFeed() 函数是异步的所以这个应该使用 Jasmine 的 beforeEach
         * 和异步的 done() 函数。
         */
         beforeEach(function(done){
           // 设置超时时间
           jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
           loadFeed(0,done);
         });

         it('loadFeed 函数被调用而且工作正常',function() {
           // 返回的数据比0大，就说明成功
           expect($('.feed .entry').length).toBeGreaterThan(0);
         });

         // 每个spec 后恢复默认，不影响其他功能
         afterEach(function() {
           jasmine.DEFAULT_TIMEOUT_INTERVAL = timeOut;
         });
    });

    /* TODO: 写一个叫做 "New Feed Selection" 的测试用例 */
    describe('New Feed Selection',function(){
        /* TODO:
         * 写一个测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
         * 记住，loadFeed() 函数是异步的。
         */

         /*在外边将两个变量初始化，以便使用*/
         var firstFeed , secondFeed = '';
         beforeEach(function(done){
     			// 一样设置超时时间
     			jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
     			// 初始化
     			loadFeed(0, function() {
     		 		// 取初始化时.feed中的内容
     	        	firstFeed = $('.feed').html();
     	        	// 加载第二次
     		        loadFeed(1, function() {
     		        	// 取第二次.feed 中的内容
     		        	secondFeed  = $('.feed').html();
     		        	// cb 返回后done测试
     		        	done();
     		        });
     			});
     		});

        it('loadFeed 函数加载一个新源的时候内容会真的改变',function() {
    			// 第二次内容与第一次内容不等，即成功
    			expect(secondFeed).not.toEqual(firstFeed);
    		});

        	// 每个spec 后恢复默认，不影响其他功能
        	afterEach(function() {
                jasmine.DEFAULT_TIMEOUT_INTERVAL = timeOut;
          });
    });
}());
