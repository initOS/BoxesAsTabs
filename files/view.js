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

    var divs = {};
    divs.relationships = $('#relationships_open');
    divs.relationships.hide();
    divs.upload = $('#upload_form_open');
    divs.upload.hide();
    divs.monitoring = $('#monitoring_open');
    divs.monitoring.hide();
    divs.bugnote_add = $('#bugnote_add_open');
    divs.bugnote_add.hide();

    $('#relationships_closed').next('br').remove();
    $('a[name="addbugnote"]').next('br').remove();
    $('#monitors br').remove();

    var tabbar = '<div id="tab-bar">' + 
                    '<a id="show-bugnote_add" href="#">Notiz hinzufügen</a>' + 
                    '<a id="show-attachments" href="#">Angehängte Dateien</a>' + 
                    '<a id="show-upload" href="#">Datei Upload</a>' + 
                    '<a id="show-relationships" href="#">Beziehungen</a>' + 
                    '<a id="show-monitoring" href="#">Beobachter</a>' + 
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
    $(tabbar).insertBefore(divs.relationships).children('a').click(function(ev){
        show_tab(ev.target.id.substring(5));
        return false;
    });

    var originalAttachment = $('#attachments').closest('tr').detach();
    divs.attachments = $('<table class="attachments">').insertBefore(divs.relationships).append(originalAttachment);

    show_tab('bugnote_add');
});
})(jQuery);
