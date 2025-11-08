# DevCollab Server - Neon PostgreSQL Setup

## Prerequisites

- Java 21+
- Maven 3.6+
- Neon PostgreSQL account (https://neon.tech)

## Setting up Neon PostgreSQL

### 1. Create a Neon Account

1. Go to [Neon.tech](https://neon.tech)
2. Sign up for a free account
3. Create a new project

### 2. Get Your Database Credentials

From your Neon dashboard:
1. Select your project
2. Go to the "Connection Details" section
3. Copy your connection string - it will look like:
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your Neon credentials:
   ```env
   # Example Neon connection string:
   # postgresql://alex:AbC123dEf@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   
   DATABASE_URL=jdbc:postgresql://ep-xxx-xxx.region.aws.neon.tech:5432/neondb?sslmode=require
   DATABASE_USERNAME=your-neon-username
   DATABASE_PASSWORD=your-neon-password
   
   # Other configurations...
   ```

### 4. Important Notes

#### Converting Neon Connection String

Neon provides a connection string like:
```
postgresql://user:pass@host/db?sslmode=require
```

For Spring Boot, convert it to:
```
jdbc:postgresql://host:5432/db?sslmode=require
```

**Example:**
- **Neon format:** `postgresql://alex:pass123@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require`
- **Spring Boot format:** `jdbc:postgresql://ep-cool-darkness-123456.us-east-2.aws.neon.tech:5432/neondb?sslmode=require`
- **Username:** `alex`
- **Password:** `pass123`

## Running the Application

### Development Mode

```bash
# Make sure you're in the server directory
cd server

# Run with Maven
./mvnw spring-boot:run
```

The application will:
1. Load environment variables from `.env`
2. Connect to your Neon PostgreSQL database
3. Automatically create/update tables based on your JPA entities
4. Start on port 8080

### Production Mode

```bash
# Build the application
./mvnw clean package -DskipTests

# Run the JAR
java -jar target/devcollab-0.0.1-SNAPSHOT.jar
```

## Database Configuration Options

### JPA DDL Auto Modes

Set `JPA_DDL_AUTO` in your `.env`:

- `update` (default) - Updates schema, doesn't drop tables
- `create` - Drops and recreates schema on startup
- `create-drop` - Creates schema, drops on shutdown
- `validate` - Only validates schema, doesn't modify
- `none` - No schema management

**Recommended:**
- Development: `update`
- Production: `validate` or `none` (use migration tools like Flyway/Liquibase)

### Connection Pool Settings

The application is pre-configured with HikariCP connection pooling:
- Maximum pool size: 10 connections
- Minimum idle: 5 connections
- Connection timeout: 30 seconds

These can be adjusted in `application.properties` if needed.

## Verifying the Setup

1. Start the application
2. Check the logs for successful database connection:
   ```
   HikariPool-1 - Starting...
   HikariPool-1 - Start completed.
   ```

3. Test the API:
   ```bash
   curl http://localhost:8080/api/auth/health
   ```

## Troubleshooting

### Connection Failed

**Error:** `Connection refused` or `Unknown host`
- **Solution:** Check your `DATABASE_URL` format. Make sure you've added `jdbc:` prefix.

### SSL/TLS Issues

**Error:** `SSL connection has been closed unexpectedly`
- **Solution:** Ensure your connection string includes `?sslmode=require`

### Authentication Failed

**Error:** `password authentication failed`
- **Solution:** 
  - Verify your username and password are correct
  - Check for special characters in password (may need URL encoding)
  - Make sure you're using the database owner credentials from Neon

### Schema Not Created

**Error:** Tables not being created automatically
- **Solution:** 
  - Check `JPA_DDL_AUTO` is set to `update` or `create`
  - Verify JPA entities have proper `@Entity` annotations
  - Check logs for Hibernate schema generation messages

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | JDBC connection string | `jdbc:postgresql://host:5432/db?sslmode=require` |
| `DATABASE_USERNAME` | Database user | `alex` |
| `DATABASE_PASSWORD` | Database password | `SecurePass123` |
| `JPA_DDL_AUTO` | Schema generation strategy | `update` |
| `JPA_SHOW_SQL` | Log SQL queries | `false` |
| `JWT_SECRET` | JWT signing secret | (256-bit string) |
| `JWT_EXPIRATION` | Token expiration (ms) | `86400000` (24 hours) |
| `GEMINI_API_KEY` | Google Gemini API key | `your-key` |
| `GITHUB_API_TOKEN` | GitHub API token | `ghp_xxx` |

## Migration from H2 to PostgreSQL

The application has been fully configured for PostgreSQL. Key changes:

1. ✅ Removed H2 dependency
2. ✅ Updated to PostgreSQL dialect
3. ✅ Added connection pooling optimizations
4. ✅ Environment variable configuration
5. ✅ Neon-compatible SSL settings

All JPA entities and repositories work seamlessly with PostgreSQL - no code changes needed!

## Next Steps

1. Configure your `.env` file with Neon credentials
2. Run the application
3. Access the API at `http://localhost:8080`
4. Check logs to verify database connection
5. Start developing!

## Additional Resources

- [Neon Documentation](https://neon.tech/docs)
- [Spring Data JPA Documentation](https://spring.io/projects/spring-data-jpa)
- [PostgreSQL JDBC Documentation](https://jdbc.postgresql.org/documentation/)
