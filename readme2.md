# SCRIPTS

## Script pour bash :
set up et test e2e:         npm run test:setUpAndE2E
set up et lancement:        npm run start:setUpAndStart
Test e2e :                  npm run test:e2e:postgres
lancement :                 npm run start:postgres

## Script pour PowerShell:
set up et test e2e:         npm run test:setUpAndE2EWin
set up et lancement:        npm run start:setUpAndStartWin
Test e2e :                  npm run test:e2e:postgresWin
lancement :                 npm run start:postgresWin


# TECHNOS
ORM : prisma
SGBD : postgreSQL

# ENV

# database
DATABASE_PORT=24000
DATABASE_NAME=nestjs-final-test-db
 
DATABASE_URL="postgresql://postgres:postgres@localhost:24000/nestjs-final-test-db?schema=public"

