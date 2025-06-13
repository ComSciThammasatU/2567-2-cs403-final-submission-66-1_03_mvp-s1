[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/w8H8oomW)
**<ins>Note</ins>: Students must update this `README.md` file to be an installation manual or a README file for their own CS403 projects.**

**รหัสโครงงาน:** 66-1_03_mvp-s1

**ชื่อโครงงาน (ไทย):** โมบายแอปพลิเคชันการจัดการการขายและการสต็อกสินค้า

**Project Title (Eng):** MOBILE APPLICATION FOR SALES AND INVENTORY MANAGEMENT

**อาจารย์ที่ปรึกษาโครงงาน:** ผู้ช่วยศาสตราจารย์ ดร.เสาวลักษณ์ วรรธนาภา 

**ผู้จัดทำโครงงาน:** 
1. นางสาว อรณัส นุชธิสาร  6209650412  aranut.nuc@dome.tu.ac.th

   

# โครงสร้างไฟล์ของระบบ
```
UdomProject
        │   .gitignore
        │   App.js
        │   app.json
        │   index.js
        │   package.json
        │   server.js
        │   ssl.crt
        │   ssl.csr
        │   yarn.lock
        │
        └───assets
            │   adaptive-icon.png
            │   favicon.png
            │   icon.png
            │   splash-icon.png
            │
            ├───components
            │       Amount.js
            │       Price.js
            │       RiceN.js
            │       RiceName.js
            │       RiceType.js
            │       Sname.js
            │       Unit.js
            │
            └───screen
                    checkMember.js
                    Header.js
                    home.js
                    insert.js
                    Sell.js
                    sellHT.js
                    showTime.jsx
```
# Tech Stack
 1.  **React Native**
   
 2.  **Node.js**
   
 3.  **express.js**
   
 4.  **Database:** Microsoft SQL Server (MSSQL)
   
# ความต้องการ
   ผู้ใช้งานจำเป็นต้องติดตั้ง ก่อนในการใช้งาน 

  1.**Git**

   เพื่อใช้คำสั่งในการจัดการต่างๆ เกี่ยวกับ Git โดยสามารถ Download ได้ที่ [Download](https://git-scm.com/downloads)

  2.**Node.js**  

   ใช้สำหรับรันคำสั่งใช้งาน server
   
   3.**Microsoft SQL Server Management Studio**
   
   ใช้สำหรับจัดการ DataBase
   
   4.**Visual Studio Code**
   
   ใช้สำหรับจัดการ Code
   
   5.**Expo** 
   
   ใช้สำหรับ ทดลองรันโปรแกรมไม่จำเป็น หากใช้ .apk

   6.**Android Studio**(ไม่จำเป็น)

   ใช้ในการ run emulator
      
# ขั้นตอนการติดตั้ง
   1. สร้างโฟลเดอร์เพื่อ ใช้ในการ clone git
   2. เปิด CommandPrompt ในโฟลเดอร์ที่เราสร้าง
   3. ใช้คำสั่ง git clone https://github.com/ComSciThammasatU/2567-2-cs403-final-submission-66-1_03_mvp-s1.git
   4. ใช้คำสั่ง CD เข้าไปใน Folder UdomProject
   5. ใช้คำสั่ง npm install หรือ yarn install
   6. ติดตั้ง expo cli (หากยังไม่มี) npm install -g expo-cli

      ## ติดตั้งและใช้งาน DataBase
      ในโมบายแอปนี้ ได้ใช้ cloudflare สร้าง vpn เพื่อความสะดวกในการติดต่อกันระหว่างclient และ server หากต้องการใช้ database ของท่านเองจะต้องทำการแก้ไข URL และ port ใน API

         1. เปิด Microsoft SQL Server Management Studio จากนั้นกด connect
         2. คลิกความที่ Databases และเลือก Restore database
         3. เลือกไฟล์ udomdb.bak และกด ok
         4. จากนั้นเลือก security และคลิกขวาที่ user กด new user
         5. กรอกข้อมูล
      เมื่อทำการเพิ่ม user แล้วจะต้องไปแก้ไขข้อมูลที่ server.js
         ```
         const config = { server: "<ชื่อ server>",
         authentication: {  type: 'default',
         options: {
         userName: "<username ที่สร้าง>",
         password: "<password ที่สร้าง>"
          }
         }
         ```
         เมื่อทำการแก้ไขเสร็จแล้ว ใช้คำสั่ง node server.js จาก

      ## ติดตั้ง
         ### หากท่านใช้ expo ในการรัน
      เปิด emulator หรือ เตรียม tablet android ของท่านที่ทำการติดตั้ง expo
         1.ใช้คำสั่ง npx yarn start
         2.หากท่านใช้ emulator ให้กด a / ใช้ Tablet android ให้สแกน QR code
         3.เสร็จสิ้น
         ### หากท่านติดตั้ง .apk
      ติดตั้งและใช้งานได้ตามปกติ

# การใช้งาน

   การบันทึกการขาย เราจะต้องเลือก 
         

