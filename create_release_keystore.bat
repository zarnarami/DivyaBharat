@echo off
REM =========================================================================
REM DivyaBharat Release Keystore Generator Utility
REM =========================================================================

setlocal

set "JAVA_HOME=C:\Program Files\Android\Android Studio1\jbr"
set "KEYTOOL=%JAVA_HOME%\bin\keytool.exe"

if not exist "%KEYTOOL%" (
    echo [ERROR] keytool not found at %KEYTOOL%
    exit /b 1
)

echo Generating DivyaBharat Release Keystore...
echo Destination: android\app\release-keystore.jks
echo.

"%KEYTOOL%" -genkeypair -v -keystore android\app\release-keystore.jks -alias divyabharat -keyalg RSA -keysize 2048 -validity 10000 -storepass DivyaBharatKey123 -keypass DivyaBharatKey123 -dname "CN=DivyaBharat, OU=Dev, O=DivyaBharat, L=NewDelhi, ST=Delhi, C=IN"

if %ERRORLEVEL% equ 0 (
    echo.
    echo =======================================================================
    echo [SUCCESS] Keystore created: android\app\release-keystore.jks
    echo Alias: divyabharat
    echo Password: DivyaBharatKey123
    echo.
    echo You can now build signed release APK with:
    echo cd android ^&^& gradlew.bat assembleRelease -PRELEASE_STORE_FILE=release-keystore.jks -PRELEASE_STORE_PASSWORD=DivyaBharatKey123 -PRELEASE_KEY_ALIAS=divyabharat -PRELEASE_KEY_PASSWORD=DivyaBharatKey123
    echo =======================================================================
)

endlocal
