
sql_content = """
-- Empleados ordenados alfabéticamente (Z...A)
-- Muestra los nombres de los empleados en orden alfabético descendente.
SELECT NOMBRES 
FROM EMPLEADOS 
ORDER BY NOMBRES DESC;

-- Empleados de Soporte
-- Muestra el nombre, el puesto y la localidad de los empleados con el puesto de 'Soporte'.
SELECT e.NOMBRES, p.PUESTO, l.LOCALIDAD 
FROM EMPLEADOS e
JOIN PUESTOS p ON e.PUESTO_ID = p.ID
JOIN DEPARTAMENTOS d ON e.DEPARTAMENTO_ID = d.ID
JOIN LOCALIDADES l ON d.LOCALIDAD_ID = l.ID
WHERE p.PUESTO = 'Soporte';

-- Nombres que terminan con 'o'
-- Lista los nombres de los empleados cuyo nombre termina con la letra 'o'.
SELECT NOMBRES 
FROM EMPLEADOS 
WHERE NOMBRES LIKE '%o';

-- Empleados en Carlos Paz
-- Muestra el nombre, sueldo y localidad de los empleados que trabajan en la localidad Carlos Paz.
SELECT e.NOMBRES, e.SUELDO, l.LOCALIDAD 
FROM EMPLEADOS e
JOIN DEPARTAMENTOS d ON e.DEPARTAMENTO_ID = d.ID
JOIN LOCALIDADES l ON d.LOCALIDAD_ID = l.ID
WHERE l.LOCALIDAD = 'Carlos Paz';

-- Sueldos entre 10000 y 13000
-- Muestra el nombre, sueldo y localidad de los empleados cuyo sueldo se encuentra entre 10000 y 13000.
SELECT NOMBRES, SUELDO, l.LOCALIDAD 
FROM EMPLEADOS e
JOIN DEPARTAMENTOS d ON e.DEPARTAMENTO_ID = d.ID
JOIN LOCALIDADES l ON d.LOCALIDAD_ID = l.ID
WHERE SUELDO BETWEEN 10000 AND 13000;

-- Departamentos con más de 5 empleados
-- Visualiza los departamentos que tienen más de 5 empleados.
SELECT d.DENOMINACION
FROM DEPARTAMENTOS d
JOIN EMPLEADOS e ON d.ID = e.DEPARTAMENTO_ID
GROUP BY d.DENOMINACION
HAVING COUNT(e.ID) > 5;

-- Empleados en Córdoba con puesto de Analista o Programador
-- Muestra los nombres de los empleados que trabajan en Córdoba y tienen el puesto de 'Analista' o 'Programador'.
SELECT e.NOMBRES 
FROM EMPLEADOS e
JOIN DEPARTAMENTOS d ON e.DEPARTAMENTO_ID = d.ID
JOIN LOCALIDADES l ON d.LOCALIDAD_ID = l.ID
JOIN PUESTOS p ON e.PUESTO_ID = p.ID
WHERE l.LOCALIDAD = 'Córdoba' AND (p.PUESTO = 'Analista' OR p.PUESTO = 'Programador');

-- Sueldo medio de todos los empleados
-- Calcula el sueldo medio de todos los empleados.
SELECT AVG(SUELDO) AS SueldoMedio
FROM EMPLEADOS;

-- Máximo sueldo en el departamento 10
-- Muestra el máximo sueldo de los empleados del departamento 10.
SELECT MAX(SUELDO) AS MaxSueldo
FROM EMPLEADOS
WHERE DEPARTAMENTO_ID = 10;

-- Sueldo mínimo en el departamento Soporte
-- Calcula el sueldo mínimo de los empleados del departamento 'Soporte'.
SELECT MIN(e.SUELDO) AS MinSueldo
FROM EMPLEADOS e
JOIN PUESTOS p ON e.PUESTO_ID = p.ID
WHERE p.PUESTO = 'Soporte';

-- Suma de sueldos por puesto
-- Calcula la suma de sueldos para cada puesto.
SELECT p.PUESTO, SUM(e.SUELDO) AS SumaSueldos
FROM EMPLEADOS e
JOIN PUESTOS p ON e.PUESTO_ID = p.ID
GROUP BY p.PUESTO;
"""

-- # Save the SQL content to a file
-- file_path = "/mnt/data/queries.sql"
-- with open(file_path, "w") as file:
--     file.write(sql_content)

-- file_path
