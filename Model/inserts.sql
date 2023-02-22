INSERT INTO SecurityQs(question)
		VALUES('What was your first car?'),
		('What is your oldest sibling’s birthday month and year? (e.g., January 1900)'),
        ('What was the first concert you attended?'),
        ('Where were you when you first heard about June 3rd incident?'),
        ('What was your favorite food as a child?'),
        ('What is the name of the teacher who gave you your first failing grade?'),
        ('What is the name of your favorite childhood friend?'),
        ('What was the first class or lecture you skipped in Universty?'),
        ('What are your two least favorite animals?');

INSERT INTO SecurityQs (question)
		VALUES ('What was the name of your primary three teacher?'),
        ('In what city does your nearest sibling live?'),
        ('In what city or town was your first school?'),
        ('In what city or town did your mother and father meet?'),
        ('What is the name of a universty you applied to but didn\'t attend?'),
        ('What was your childhood nickname?'),
        ('What was your dream job as a child?'),
        ('What is the name of the first primary school you attended?'),
        ('What is your oldest cousin\'s first and last name?'),
        ('what is the name of area you were living in primary six?'),
        ('Where were you when you had your first kiss?'),
        ('What is the first name of the boy or girl that you first kissed?'),
        ('What time of the day were you born?'),
        ('What is the name of your high school principal?'),
        ('What was the name of the first preschool you attended?'),
        ('What city or town were you in on New Year\'s 2000?'),
        ('What was your least favorite food as a child?'),
        ('What was the first exam you failed?'),
        ('What is the name of your first best friend?'),
        ('What is the name of the town where you were born?'),
        ('What is your mother\'s maiden name?');
        
-- Professor & HOD inserts
INSERT INTO Users(surName,otherNames,emailAddress,privilege,departmentId,photo,userPassword)
 VALUES('Browning','Lourdes','lourdes@example.com','head_of_department',2,'user-4.jpg','$2a$12$PEddIpWclYR/8orarRjeJOh12zoPQSiXADqfu8WFqh6NZ/Eqrla7O'),
 ('Hart','Sophie Louise','sophie@example.com','head_of_department',3,'user-5.jpg','$2a$12$cOBIfoysDcKBgI0fYXj2QeXUpFYxsmZMFJuozEzrdtwIjeaUSWThu'),
 ('Cornell','Ayla','ayla@example.com','head_of_department',4,'user-6.jpg','$2a$12$22f6MqI6M1KZDRKpeoH3feogGx215jtyOLET67PmXrKgmiVo2TWna'),
 ('Hardy','Jennifer','jenny@example.com','head_of_department',5,'user-7.jpg','$2a$12$Bglm7AS.J3s5ZCPfgb/CHujyHEJ7w5RgwQDShxPA4bfNkgWoRbQQC'),
 ('Max','Smith','max@example.com','professor',2,'user-15.jpg','$2a$12$f4yzEW5cUHuRufI0tVbrjeg63/HI3kZtv2WWlNhazqbajUxE2iHvW'),
 ('Kirkland','Isabel','isabel@example.com','professor',2,'user-16.jpg','$2a$12$Jop02ckdcCqg/FlA2tc.1.hZ4VdMgcIJi7.yiCPnsjo16AqUp6M..'),
 ('Jones','Alexander','jones@example.com','professor',2,'user-17.jpg','$2a$12$XOcusiKzAX4cxWB5saItuupdjyfNvbU7bgWiNa3khQi1E.uNnpqPW'),
 ('Brown','Lisa','brown@example.com','professor',3,'user-18.jpg','$2a$12$QYFSLW8shd16cDa33UzH3OnrFCSJ1lk/igZuL2YI0PCBU6x2n.bqS'),
 ('Breva','Seva','breva@example.com','professor',3,'user-18.jpg','$2a$12$7zBCGKNMCpSHIGo8NpKkn.EfvAmwBmJtr0RUrX.cMvweOvU4Mn.4i'),
 ('Laffut','Claire','claire@example.com','professor',3,'user-19.jpg','$2a$12$b7tDWu.ZFRzn50pRQCS..Ob9r0ahEMl8EoQv4CkH3aHTcPUyN.mc2'),
 ('Sharon','Naomi','sharon@example.com','professor',4,'user-20.jpg','$2a$12$bgNbGq55IQduayi.TUjs0.E/ZYerLwtgDqTLIOQypxtRgJTE05vau'),
 ('Jordan','Majid','jordan@example.com','professor',4,'user-21.jpg','$2a$12$nvJyXWQw.ebeyIQK84d59.LGqheIsgtWpeHnL/uA6HkRkNBcYZBuW'),
 ('Koffi','Ryan','koffi@example.com','professor',4,'user-22.jpg','$2a$12$T.nmacycWMaOkcnsdPl5buL8rzDqAOpkAYTJ7j9wF.QjjcoLMT7eK'),
 ('Vie','Bella','bella@example.com','professor',5,'user-23.jpg','$2a$12$2Wh89dLVSa9OIushDzBDHeCR3qJNdXH8D2jkRnYS5Tdi5AdhYTnLi'),
 ('Addams','Wednesday','wednesday@example.com','professor',5,'user-24.jpg','$2a$12$K1UviUum1CXJPXT/fWw4xeNLJwZfch325iBDIQZ0tL9Tkaipd1v8u'),
 ('Austin','Jeunne','jeunne@example.com','professor',5,'user-25.jpg','$2a$12$d/7RSQrQ4momnia6A8ZxX.lKqk/G3WvfDAY0ctBUgb8f3EVcZbEiK');

INSERT INTO Users (surName,otherNames,emailAddress,privilege,departmentId,photo,userPassword,indexNumber)
 VALUES('Morrison','Kate','kate@example.com','student',2,'user-7.jpg','$2a$12$sOJRVTUhuwaUq0/PrPCpNOo9Ax6fVQby26YWpMKdur/qY35kxac22',10111321),
 ('Stout','Elliana','elliana@example.com','student',2,'user-8.jpg','$2a$12$Lkd1XTADQL8xlwJVbXotvuWamaK3zDUqyzqbnM451Mv035bkZF5ha',10111322),
 ('Vega','Christian','christian@example.com','student',3,'user-9.jpg','$2a$12$US.1dLo.Bc57dA6w6NgqQ.FGVMLXasaV1t/3kDGg4jpLqdc652EE.',10111323),
 ('Scaife','Steve','steve@example.com','student',3,'user-10.jpg','$2a$12$kN4ezNEyt.3lEIgt3sDic.SlpIiez9cQj7QL4OpWiWQ94yG3ppL3u',10111324),
 ('Lynn','Araav','lynn@example.com','student',4,'user-11.jpg','$2a$12$UGYfv/yToAhjHGVuXljVHOZ/dezevFKSQq08cFXsHT02LiSTZmCb2',10111325),
 ('Myles','Miyah','miyah@example.com','student',4,'user-12.jpg','$2a$12$Y4UzAFt8J49lpouSaNFY3.8suVUylhWcWS2vsVkujfxnicQhl06q2',10111326),
 ('Hadley','Ben','ben@example.com','student',5,'user-13.jpg','$2a$12$tM0aMkLzkBpWYVNFH9rt1OCLgTfbCwbG4Aa2hqFYnOIAuO5q2f/ny',10111327),
 ('Wilson','laura','wilson@example.com','student',5,'user-14.jpg','$2a$12$oVIl.6kWoOuAd9ds0oBPW.ufPTQO0ZlYC3VSHP2qnAgOXgv/JS3fe',10111328);

SELECT * FROM SecurityQs
ORDER BY questionId ASC;











