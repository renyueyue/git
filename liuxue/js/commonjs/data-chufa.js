/**
 * Created by renyueyue on 2017/8/18.
 */
// var xiala=document.querySelector('[data-chufa="xiala"]');
// xiala.onclick=function (e) {
//     e.preventDefault();
//     this.nextElementSibling.style.display='block';
// }
$('[data-chufa="xiala"]').click(
  function (e) {
    e.preventDefault();
    $(this).next().toggle();
  }
)

