package com.servico.backservico.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.servico.backservico.entity.Servico;
import com.servico.backservico.service.ServicoService;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("api/servico")
public class ServicoController {
    
    @Autowired
    private ServicoService servicoService;

    @GetMapping("/")
    @CrossOrigin("http://localhost:3000")
    public List<Servico> buscarTodos(){
        return servicoService.buscarTodos();
    }

    @GetMapping("/pagamentoPendente")
    @CrossOrigin("http://localhost:3000")
    public List<Servico> buscarServicosPagamentoPendente(){
        return servicoService.buscarServicosPagamentoPendente();
    }

    @GetMapping("/cancelados")
    @CrossOrigin("http://localhost:3000")
    public List<Servico> buscarServicosCancelados(){
        return servicoService.buscarServicosCancelados();
    }

    @PostMapping("/")
    @CrossOrigin("http://localhost:3000")
    public Servico inserir(@RequestBody Servico servico){
        return servicoService.inserir(servico);
    }

    @PutMapping("/")
    @CrossOrigin("http://localhost:3000")
    public Servico alterar(@RequestBody Servico servico){
        return servicoService.alterar(servico);
    }

    @DeleteMapping("/{id}")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id){
        servicoService.excluir(id);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Void> cancelar(@PathVariable("id") Long id){
        servicoService.cancelarServico(id);
        return ResponseEntity.ok().build();
    }

}
