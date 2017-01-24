(function (global) {
    System.config({
        transpiler: 'ts',
        typescriptOptions: {
            tsconfig:true
        },
        meta: {
            'typescript': {
                "exports": "ts"
            }
        },
        paths: {
            // paths serve as alias
            'npm:': 'js/lib/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            // other libraries
            'ts': 'npm:plugin-typescript/lib/plugin.js',
            'typescript': 'npm:typescript/lib/typescript.js',
            'rxjs': 'npm:rxjs',
            '@ngrx/core': 'npm:@ngrx/core',
            '@ngrx/store': 'npm:@ngrx/store',
            '@ngrx/store-devtools': 'npm:@ngrx/store-devtools',
            '@ngrx/store-log-monitor': 'npm:@ngrx/store-log-monitor',
            'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            '@ngrx/core': {
                main: 'bundles/core.min.umd.js',
                format: 'cjs'
            },
            '@ngrx/store': {
                main: 'bundles/store.min.umd.js',
                format: 'cjs'
            },
            '@ngrx/store-devtools': {
                main: 'bundles/store-devtools.min.umd.js',
                format: 'cjs'
            },
            '@ngrx/store-log-monitor': {
                main: 'bundles/store-log-monitor.min.umd.js',
                format: 'cjs'
            },
            'angular2-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            }

        }
    });
})(this);
