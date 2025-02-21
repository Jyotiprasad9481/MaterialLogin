import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	loginUser: any = {};
	menuMode: string = 'side'; // Default to side menu
	colorScheme: string = 'blue-theme'; // Default theme
	title = 'af-notification';

	layoutColors = [
		{ name: 'blue', color: '#0F8BFD' },
		{ name: 'green', color: '#0BD18A' },
		{ name: 'magenta', color: '#EC4DBC' },
		{ name: 'orange', color: '#FD9214' },
		{ name: 'purple', color: '#873EFE' },
		{ name: 'red', color: '#FC6161' },
		{ name: 'teal', color: '#00D0DE' },
		{ name: 'yellow', color: '#EEE500' }
	];
    ripple: any;

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {
    const userDet = localStorage.getItem('userDet');
		this.loginUser = userDet ? JSON.parse(userDet)[0] || {} : {};
  }

	ngOnInit(): void {


		// Set theme & menu mode
		this.colorScheme = this.loginUser.theme ?? 'blue-theme';
		this.menuMode = this.loginUser.menu_type ?? 'side';

		// Subscribe to router events
		this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
			const rt = this.getChild(this.activatedRoute);
			rt.data.subscribe(data => {
				const appTitle = environment.production ? (data['title'] || 'Cables-ERP') : `DEV - ${data['title']}`;
				this.titleService.setTitle(appTitle);
			});
		});
	}

	getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
		return activatedRoute.firstChild ? this.getChild(activatedRoute.firstChild) : activatedRoute;
	}

	changeTheme(theme: string): void {
		this.colorScheme = theme;
		document.documentElement.style.setProperty('--primary-color', theme);
		localStorage.setItem('selectedTheme', theme);
	}
}
