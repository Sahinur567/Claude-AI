$workspaceDir = "c:\Users\Md Sahinur Rahaman\Downloads\Claude AI Water Mark"
$batFilePath = "$workspaceDir\daily_seo_engine.bat"

# 1. Create the .bat wrapper
$batContent = @"
@echo off
cd /d "$workspaceDir"
python master_automation.py > automation_log.txt 2>&1
"@

Set-Content -Path $batFilePath -Value $batContent
Write-Host "Created daily_seo_engine.bat"

# 2. Register the Scheduled Task
$taskName = "ClaudeWatermark_Daily_SEO_Automation"
$action = New-ScheduledTaskAction -Execute $batFilePath
$trigger = New-ScheduledTaskTrigger -Daily -At 10:00AM

# Note: We run as the current user, Interactive.
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Description "Runs the master SEO automation script daily" -Force

Write-Host "Successfully registered scheduled task: $taskName"
Write-Host "It will run daily at 10:00 AM."
