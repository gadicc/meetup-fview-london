People = new Meteor.Collection('people');

if (Meteor.isServer) {

    People.remove({});
//  if (People.find().count() === 0) {
    var images = "http://photos3.meetupstatic.com/photos/member/4/9/4/member_177901172.jpeg http://photos4.meetupstatic.com/photos/member/6/1/2/8/member_154824872.jpeg http://photos2.meetupstatic.com/photos/member/1/c/e/a/member_162667402.jpeg http://photos2.meetupstatic.com/photos/member/f/6/8/highres_242103944.jpeg http://photos4.meetupstatic.com/photos/member/2/1/4/a/highres_130988522.jpeg http://photos1.meetupstatic.com/photos/member/5/b/4/c/highres_204023372.jpeg http://photos1.meetupstatic.com/photos/member/b/6/5/highres_246662917.jpeg http://photos3.meetupstatic.com/photos/member/2/4/6/0/member_28269312.jpeg http://photos1.meetupstatic.com/photos/member/a/b/1/0/member_154483792.jpeg http://photos2.meetupstatic.com/photos/member/2/9/c/e/member_89050702.jpeg http://photos3.meetupstatic.com/photos/member/4/8/9/0/highres_4578576.jpeg http://photos2.meetupstatic.com/photos/member/2/5/3/f/highres_9909535.jpeg http://photos2.meetupstatic.com/photos/member/8/f/9/0/highres_159756752.jpeg http://photos1.meetupstatic.com/photos/member/3/a/6/8/member_211214952.jpeg http://photos3.meetupstatic.com/photos/member/1/3/5/8/highres_113164952.jpeg http://photos4.meetupstatic.com/photos/member/6/5/2/e/highres_240685902.jpeg http://photos3.meetupstatic.com/photos/member/d/3/9/c/highres_224154172.jpeg http://photos3.meetupstatic.com/photos/member/6/d/6/5/highres_12088005.jpeg http://photos1.meetupstatic.com/photos/member/4/9/e/highres_29761182.jpeg http://photos1.meetupstatic.com/photos/member/e/6/0/5/highres_244138885.jpeg http://photos3.meetupstatic.com/photos/member/7/f/e/5/highres_243092741.jpeg http://photos4.meetupstatic.com/photos/member/5/7/5/0/member_104482352.jpeg http://photos2.meetupstatic.com/photos/member/2/5/1/4/highres_66609492.jpeg http://photos1.meetupstatic.com/photos/member/d/f/9/0/highres_186237232.jpeg http://meetup-fview-london.meteor.com/img/fview-logo-white.jpg http://photos3.meetupstatic.com/photos/member/8/6/7/6/member_45634422.jpeg http://photos2.meetupstatic.com/photos/member/9/d/8/2/highres_206860322.jpeg http://photos4.meetupstatic.com/photos/member/5/7/9/6/highres_220162422.jpeg http://photos4.meetupstatic.com/photos/member/f/4/8/highres_229923912.jpeg http://photos3.meetupstatic.com/photos/member/c/d/6/6/highres_234772582.jpeg http://photos1.meetupstatic.com/photos/member/a/e/9/7/highres_2144695.jpeg http://photos4.meetupstatic.com/photos/member/e/a/1/d/highres_242279933.jpeg http://photos3.meetupstatic.com/photos/member/a/b/c/e/highres_245383982.jpeg http://photos4.meetupstatic.com/photos/member/c/9/9/c/member_177891612.jpeg http://photos3.meetupstatic.com/photos/member/2/6/0/f/highres_246489743.jpeg http://photos4.meetupstatic.com/photos/member/e/0/1/c/highres_193017372.jpeg http://photos3.meetupstatic.com/photos/member/8/2/2/6/member_12693318.jpeg http://photos2.meetupstatic.com/photos/member/a/7/5/c/highres_9522844.jpeg http://photos1.meetupstatic.com/photos/member/6/4/8/0/highres_245005728.jpeg http://photos1.meetupstatic.com/photos/member/8/3/e/c/highres_229173772.jpeg http://photos3.meetupstatic.com/photos/member/d/7/1/6/member_197875062.jpeg http://photos4.meetupstatic.com/photos/member/c/d/7/0/highres_189712592.jpeg http://photos3.meetupstatic.com/photos/member/9/7/4/c/highres_178958732.jpeg http://photos4.meetupstatic.com/photos/member/c/e/6/2/highres_8032834.jpeg http://photos4.meetupstatic.com/photos/member/b/a/d/1/highres_244427825.jpeg http://photos2.meetupstatic.com/photos/member/8/1/d/a/member_154413242.jpeg http://photos4.meetupstatic.com/photos/member/a/b/8/c/highres_246583916.jpeg http://photos1.meetupstatic.com/photos/member/8/c/c/0/highres_186696032.jpeg http://photos4.meetupstatic.com/photos/member/a/c/1/e/highres_233204062.jpeg";
    _.each(images.split(" ").reverse(), function(url) {
      People.insert({
        url: url
      });
    });
//  }

  Meteor.publish('people', function() {
    return People.find();
  });

} else {

  Meteor.subscribe('people');

  var preloaded = [];
  People.find().observe({
    added: function(doc) {
      preloaded.push(new Image().src = doc.url);
    }
  });

}
