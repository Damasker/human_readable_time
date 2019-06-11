 $(document).ready(function() {
   $('div.total-hours').html(function() {
     var content = this.innerHTML;
     this.innerHTML = content+"<button type='button' class='hmn' id='hmn'>Human readable</button>"+"<button type='button' class='dec' id='dec'>Redmain readable</button>";
     document.getElementById('dec').style.visibility = 'hidden';
   });
   $('#hmn').click(function() {
     var elem = document.getElementById('hmn');
     elem.parentNode.removeChild(elem);
     //document.getElementById('hmn').style.visibility = 'hidden';
     document.getElementById('dec').style.visibility = 'visible';
     $( "span.hours-dec" ).html(function() {
       var dec = this.innerHTML;
       console.log(dec);
       if(dec < 0.16){
         var result = (dec*0.6);
       }else{
         var result = (dec*60);
       }
       var str = String(result);
       this.innerHTML = ":"+(str.replace("0.","")).slice(0, 2);
     });

    $("table.time-entries").html(function() {
      $( "td.hours" ).html(function() {
          var time = this.innerHTML;
          var result = (time%1);
          console.log("result "+result);
          if(result < 0.16){
            var min = String(result*0.6).slice(2, 4);
          }else{
            var min = String(result*60).slice(0, 2);
          }
          console.log("min "+min);
          var hours = String(time).slice(0, 1);
          if(parseInt(min) > 0) {
  	       this.innerHTML = hours+":"+min.replace(".","");
          } else {
           this.innerHTML = hours+":00";
         };
        });
      });
      $(document).ready(function() {
        $('table').each(function() {
          var $table = $(this);
          $('p.other-formats').html(function() {
            var content = this.innerHTML;

              this.innerHTML ="<button type='button' class='exp-btn'>Export to CSV</button>";
          })
          $('.exp-btn').click(function() {
            var csv = $table.table2CSV({delivery:'value'});
            var text = csv;
            var filename = "export.csv";
            download(filename, text);
          });
        });
      })
    })
    $('#dec').click(function() {
      document.location.reload(true);
    });
 })




   function download(filename, text) {
     var element = document.createElement('a');
     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
     element.setAttribute('download', filename);
     element.style.display = 'none';
     document.body.appendChild(element);
     element.click();
     document.body.removeChild(element);
   }

   jQuery.fn.table2CSV = function(options) {
       var options = jQuery.extend({
           separator: ',',
           header: [],
           headerSelector: 'th',
           columnSelector: 'td',
           delivery: 'popup',
           transform_gt_lt: true
       },
       options);

       var csvData = [];
       var headerArr = [];
       var el = this;
       var numCols = options.header.length;
       var tmpRow = [];
       if (numCols > 0) {
           for (var i = 0; i < numCols; i++) {
               tmpRow[tmpRow.length] = formatData(options.header[i]);
           }
       } else {
           $(el).filter(':visible').find(options.headerSelector).each(function() {
               if ($(this).css('display') != 'none') tmpRow[tmpRow.length] = formatData($(this).html());
           });
       }
       row2CSV(tmpRow);
       $(el).find('tr').each(function() {
           var tmpRow = [];
           $(this).filter(':visible').find(options.columnSelector).each(function() {
               if ($(this).css('display') != 'none') tmpRow[tmpRow.length] = formatData($(this).html());
           });
           row2CSV(tmpRow);
       });
       if (options.delivery == 'popup') {
           var mydata = csvData.join('\n');
           if(options.transform_gt_lt){
               mydata=sinri_recover_gt_and_lt(mydata);
           }
           return popup(mydata);
       }
       else if(options.delivery == 'download') {
           var mydata = csvData.join('\n');
           if(options.transform_gt_lt){
               mydata=sinri_recover_gt_and_lt(mydata);
           }
           var url='data:text/csv;charset=utf8,' + encodeURIComponent(mydata);
           window.open(url);
           return true;
       }
       else {
           var mydata = csvData.join('\n');
           if(options.transform_gt_lt){
               mydata=sinri_recover_gt_and_lt(mydata);
           }
           return mydata;
       }

       function sinri_recover_gt_and_lt(input){
           var regexp=new RegExp(/&gt;/g);
           var input=input.replace(regexp,'>');
           var regexp=new RegExp(/&lt;/g);
           var input=input.replace(regexp,'<');
           return input;
       }

       function row2CSV(tmpRow) {
           var tmp = tmpRow.join('') // to remove any blank rows
           // alert(tmp);
           if (tmpRow.length > 0 && tmp != '') {
               var mystr = tmpRow.join(options.separator);
               csvData[csvData.length] = mystr;
           }
       }
       function formatData(input) {
           // replace " with “
           var regexp = new RegExp(/["]/g);
           var output = input.replace(regexp, "“");
           //HTML
           var regexp = new RegExp(/\<[^\<]+\>/g);
           var output = output.replace(regexp, "");
           output = output.replace(/&nbsp;/gi,' '); //replace &nbsp;
           if (output == "") return '';
           return '"' + output.trim() + '"';
       }
       function popup(data) {
           var generator = window.open('', 'csv', 'height=400,width=600');
           generator.document.write('<html><head><title>CSV</title>');
           generator.document.write('</head><body >');
           generator.document.write('<textArea cols=70 rows=15 wrap="off" >');
           generator.document.write(data);
           generator.document.write('</textArea>');
           generator.document.write('</body></html>');
           generator.document.close();
           return true;
       }
   };
