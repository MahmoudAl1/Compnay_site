#!/bin/bash
sed -i 's/(مع خلفية ضبابية تملأ الشاشة)/بحيث تملأ عرض الشاشة بالكامل/g' components/AdminDashboard.tsx
sed -i 's/(with a blurred background filling the screen)/(filling the entire screen width)/g' components/AdminDashboard.tsx
