// language.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private selectedLanguageSubject = new BehaviorSubject<string>('en');
  selectedLanguage$ = this.selectedLanguageSubject.asObservable();
  private translations: Record<string, any> = {
    'en': {},
    'ro': {}
  }; // Store translations here

  constructor(private http: HttpClient) {}

  setLanguage(language: string) {
    this.selectedLanguageSubject.next(language);
    this.loadTranslations(language); // Load translations when language changes
  }

  private loadTranslations(language: string) {
    const translationPath = `assets/locale/${language}.json`;
   // console.log(language)
    this.http.get(translationPath).subscribe((translations) => {
      this.translations[language] = translations;
    });
  }
  getTranslation(key: string): string {
    const selectedLanguage = this.selectedLanguageSubject.value;
    const translation = this.translations[selectedLanguage]?.[key];
    return translation || key;
  }
}
