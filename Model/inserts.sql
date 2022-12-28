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
        
SELECT * FROM TestProfessors;
SELECT * FROM TestQRcodes;    
SELECT * FROM TestOngoingAttendances;
SELECT * FROM TestSignedAttendances;  
SELECT * FROM TestStudents;  
SELECT * FROM SecurityQs
ORDER BY questionId ASC;











