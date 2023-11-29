import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
    const port = process.env.BACK_PORT;
    const app = await NestFactory.create(AppModule);


    const config = new DocumentBuilder()
        .setTitle('Backend for Project Management System')
        .setDescription('REST API Documentation')
        .setVersion('1.0.0')
        .addTag('IB Dev')
        .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}

start();