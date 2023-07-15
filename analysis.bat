@echo off
yarn code-coverage
call sonar-scanner

REM Get current branch name
set current_branch=
for /F "delims=" %%n in ('git branch --show-current') do set "current_branch=%%n"

REM If not found end
if "%current_branch%"=="" echo Not a git branch! && goto :EOF

REM Back up sonar properties file
for /f "tokens=*" %%s in (sonar-project.properties) do (
echo %%s>>sonar-project.properties.bak
)

REM  perform branch analysis
echo sonar.branch.name=%current_branch%>>sonar-project.properties

call sonar-scanner

REM reset sonar properties
echo.|set/p x="">sonar-project.properties
for /f "tokens=*" %%s in (sonar-project.properties.bak) do (
echo %%s>>sonar-project.properties
)

@REM  perform PR analysis
echo sonar.pullrequest.key=%current_branch%>>sonar-project.properties
echo sonar.pullrequest.branch=%current_branch%>>sonar-project.properties
echo sonar.pullrequest.base=dev>>sonar-project.properties

call sonar-scanner

REM reset sonar properties
echo.|set/p x="">sonar-project.properties
for /f "tokens=*" %%s in (sonar-project.properties.bak) do (
echo %%s>>sonar-project.properties
)
REM cleanup
del /q sonar-project.properties.bak