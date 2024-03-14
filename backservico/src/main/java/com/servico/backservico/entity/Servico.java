package com.servico.backservico.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Table(name = "servico")
@Data
public class Servico {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String nomeCliente;
    
    @Temporal(TemporalType.DATE)
    private Date dataInicio = new Date();
    
    @Temporal(TemporalType.DATE)
    private Date dataTermino;

    private String descricaoServico;

    private Double valorServico;

    private Double valorPago;

    @Temporal(TemporalType.DATE)
    private Date dataPagamento;

    private String status;
    
}
