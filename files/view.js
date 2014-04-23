/*
    This file is part of BoxesAsTabs.

    BoxesAsTabs is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    BoxesAsTabs is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with BoxesAsTabs.  If not, see <http://www.gnu.org/licenses/>.
*/

(function($){
$(document).ready(function() {
    // check if javascript code should run on this page
    //  (run only on view.php)
    if ( ! window.location.pathname.search(/view\.php$/) )
        return;

    var bug_order_desc = true;
    $('#bugnotes').next('a[name="addbugnote"]').each(function() { bug_order_desc = false; });
    if (!bug_order_desc) {
        console.log("Plugin is deactivated because bug order seems to be ascending.");
        return;
    }


    // gather tab panes

    var divs = {};
    divs.relationships = $('#relationships_open');
    divs.relationships.hide();
    divs.upload_form = $('#upload_form_open');
    divs.upload_form.hide();
    divs.monitoring = $('#monitoring_open');
    divs.monitoring.hide();
    divs.bugnote_add = $('#bugnote_add_open');
    divs.bugnote_add.hide();
    // move attachments in DOM to make it available as a tab
    var originalAttachment = $('#attachments').closest('tr').detach();
    divs.attachments = $('<table class="attachments">').insertAfter(divs.relationships).append(originalAttachment);
    // move links in DOM to display it before notes
    var originalLinks = $('#linkcollection_open').detach();
    divs.linkcollection = originalLinks.insertBefore('#bugnotes');

    // kill whitespace

    $('#relationships_closed').next('br').remove();
    $('a[name="addbugnote"]').next('br').remove();
    $('#monitors br').remove();


    // create tab-bar

    var tabbar = '<div id="tab-bar">' + 
                    '<a id="show-bugnote_add" href="#">Notiz hinzufügen <span></span></a>';
    if (divs.linkcollection.length > 0){ tabbar = tabbar + '<a id="show-linkcollection" href="#">Links <span></span></a>';}
    tabbar = tabbar +'<a id="show-attachments" href="#">Angehängte Dateien <span></span></a>' + 
                    '<a id="show-upload_form" href="#">Datei Upload <span></span></a>' + 
                    '<a id="show-relationships" href="#">Beziehungen <span></span></a>' + 
                    '<a id="show-monitoring" href="#">Beobachter <span></span></a>' + 
                 '</div>';
    var show_tab = function(id) {
        for (var k in divs) {
            if (k != id) {
                divs[k].hide();
                $('#show-' + k).removeClass('active');
            } else {
                divs[k].show();
                $('#show-' + k).addClass('active');
            }
        }
    };
    var remove_closed = function(){
        for (var k in divs){
            if (k != 'attachments'){
                $('#'+k+'_closed').hide();
                $('#'+k+'_open .form-title a').remove();
                $('#'+k+'_open .form-title').text($.trim($('#'+k+'_open .form-title').text()));
            }
        }
    };
    $(tabbar).insertBefore(divs.relationships).children('a').click(function(ev){
        show_tab(ev.target.id.substring(5));
        return false;
    });


    // count element in tabs

    divs.relationships.count = function() {
        return divs.relationships.find("table table tr").size();
    };
    divs.attachments.count = function () {
        // count distinct 'file_id's appearing in links
        var fileIds = {};
        var rxFileId = /file_id=(\d+)/;
        divs.attachments.find('a').each(function(i, el){
            var m = rxFileId.exec(el.href);
            if (m)
                fileIds[m[1]] = 1;
        });
        return Object.keys(fileIds).length;
    };
    divs.monitoring.count = function() {
        return divs.monitoring.find("a[href*='view_user_page.php']").size();
    };
    divs.linkcollection.count = function() {
        return divs.linkcollection.find("td.linkcollection-links").size();
    }
    
    remove_closed();
    for (var k in divs) {
        var method = divs[k].count;
        if (!method)
            continue;
        var count = method();
        if (count) {
            $('#show-' + k + ' span').html("(" + count + ")");
        }
    }

    // initially open the "add note" tab

    show_tab('bugnote_add');
});
})(jQuery);
