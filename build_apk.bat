@echo off
REM =========================================================================
REM DivyaBharat Android APK Build Utility
REM =========================================================================

setlocal enabledelayedexpansion

set "JAVA_HOME=C:\Program Files\Android\Android Studio1\jbr"
set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo =======================================================================
echo          DIVYABHARAT ANDROID APPLICATION BUILD SCRIPT
echo =======================================================================
echo Java Home:    %JAVA_HOME%
echo Android SDK:  %ANDROID_HOME%
echo.

set "BUILD_TYPE=debug"
if not "%1"=="" set "BUILD_TYPE=%1"

echo 1. Building React Web Bundle...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo [ERROR] React build failed!
    exit /b %ERRORLEVEL%
)

echo.
echo 2. Syncing Capacitor Android Assets...
call npx cap sync android
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Capacitor sync failed!
    exit /b %ERRORLEVEL%
)

echo.
echo 3. Building Android APK (%BUILD_TYPE%)...
cd android

if /i "%BUILD_TYPE%"=="release" (
    call gradlew.bat assembleRelease
    cd ..
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] Gradle assembleRelease failed!
        exit /b %ERRORLEVEL%
    )
    echo.
    echo =======================================================================
    echo [SUCCESS] Release APK built at:
    echo android\app\build\outputs\apk\release\
    echo =======================================================================
) else (
    call gradlew.bat assembleDebug
    cd ..
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] Gradle assembleDebug failed!
        exit /b %ERRORLEVEL%
    )
    echo.
    echo =======================================================================
    echo [SUCCESS] Debug APK built at:
    echo android\app\build\outputs\apk\debug\app-debug.apk
    echo =======================================================================
)

endlocal
