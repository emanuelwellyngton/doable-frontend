import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly apiUrl = 'http://localhost:8080/api/auth';
    private readonly TOKEN_KEY = 'doable_token';

    private _token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));

    readonly isAuthenticated = computed(() => !!this._token());
    readonly username = computed(() => this.parseUsername(this._token()));

    constructor(private http: HttpClient, private router: Router) { }

    login(username: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
            tap(res => this.storeToken(res.token))
        );
    }

    register(username: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { username, password }).pipe(
            tap(res => this.storeToken(res.token))
        );
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        this._token.set(null);
        this.router.navigate(['/sign-in']);
    }

    getToken(): string | null {
        return this._token();
    }

    private storeToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
        this._token.set(token);
    }

    private parseUsername(token: string | null): string {
        if (!token) return '';
        try {
            const payload = token.split('.')[1];
            const decoded = JSON.parse(atob(payload));
            return decoded.sub ?? '';
        } catch {
            return '';
        }
    }
}
