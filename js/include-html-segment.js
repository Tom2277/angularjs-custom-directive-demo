$(function(){
    var includes = $('[data-include-html-segment]');
    jQuery.each(includes, function(){
      var file = 'views/' + $(this).data('include-html-segment') + '.html';
      $(this).load(file);
    });
  });
//this code is nearly directly from this StackOverflow answer 
//question: https://stackoverflow.com/questions/8988855/include-another-html-file-in-a-html-file/9003363#9003363
//thank you to mhanisch