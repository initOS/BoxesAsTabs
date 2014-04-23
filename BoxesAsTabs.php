<?php

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

class BoxesAsTabsPlugin extends MantisPlugin {

	function register() {
		$this->name        = 'BoxesAsTabs';
		$this->description = 'Re-arranges some of the cluttered boxes on the view.php-page into tabs.';
		$this->version     = '0.2';
		$this->requires    = array('MantisCore'       => '1.2.0', 'jQuery' => '1.6');
		$this->author      = 'Thomas Rehn';
		$this->contact     = 'thomas.rehn-at-initos.com';
		$this->url         = 'http://www.initos.com';
	}


	function hooks() {
		return array(
			'EVENT_LAYOUT_RESOURCES' => 'resources',
		);
	}

	function resources( $p_event ) {
        return '<link rel="Stylesheet" type="text/css" href="' . plugin_file( 'view.css') . '" />' .
               '<script type="text/javascript" src="' . plugin_file( 'view.js' ) . '"></script>';
	}
}
