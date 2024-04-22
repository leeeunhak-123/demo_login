package org.example.demo_login.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}") //application.properties에서 설정한 파일 디렉토리
    private String uploadDir;

    public String storeFile(MultipartFile file){
        //파일을 저장할 디렉토리가 존재하면 생성
        File directory = new File(uploadDir);
        if(!directory.exists()) {
            directory.mkdirs();
        }
        try{
            //파일의 원래 이름을 가져옴
            String originalFileName = file.getOriginalFilename();
            //파일 확장자를 추출
            assert originalFileName != null;
            String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
            //유니크한 파일 이름을 생성
            String fileName = UUID.randomUUID().toString() + fileExtension;

            //파일을 저장할 경로
            Path filePath = Paths.get(uploadDir + fileName);
            //파일을 저장
            Files.write(filePath,file.getBytes());

            //파일이 저장된 경로를 반환
            return fileName;
        } catch(IOException e){
            e.printStackTrace();
            //파일 저장 중 오류가 발생하면 null 반환
            return null;
        }
    }



}
