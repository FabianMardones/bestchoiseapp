import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

// firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, initializeFirestore, persistentLocalCache, provideFirestore } from '@angular/fire/firestore';
import { getAuth, indexedDBLocalPersistence, initializeAuth, provideAuth } from '@angular/fire/auth';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ScreenTrackingService, getAnalytics, provideAnalytics, UserTrackingService } from '@angular/fire/analytics';
import { Capacitor } from '@capacitor/core';


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // firebase
    provideFirebaseApp(() => {
      const app = initializeApp(environment.firebaseConfig);
      if (Capacitor.isNativePlatform()) {
        initializeFirestore(app, {
          localCache: persistentLocalCache(),
        });
        initializeAuth(app, {
          persistence: indexedDBLocalPersistence
        });
      }
      return app;
    }),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
  ],
});
