import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";

const loteDemo = {
  codigo: "LT-2026-0831-001",
  produto: "Leite Pasteurizado Integral",
  dataProducao: "31/08/2026",
  quantidade: "500 litros",
  produtor: "João da Silva",
  fazenda: "Fazenda Boa Vista",
  municipio: "Garanhuns - PE",
  animal: "Vaca #0254",
  raca: "Girolando",
  producaoAnimal: "24 litros/dia",
  ordenha: "31/08/2026 — 06:30",
  volume: "24 litros",
  temperatura: "4,1 °C",
};

export default function App() {
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState(false);
  const [erro, setErro] = useState(false);

  function consultarLote() {
    const valor = codigo.trim().toUpperCase();

    setResultado(false);
    setErro(false);

    if (valor === loteDemo.codigo) {
      setResultado(true);
    } else {
      setErro(true);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#176b45"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>
            🥛 LactApp
          </Text>

          <Text style={styles.logoSubtitle}>
            Gestão e Qualidade
          </Text>
        </View>

        <Text style={styles.headerStatus}>
          Sistema de{"\n"}rastreabilidade
        </Text>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >

        {/* BUSCA */}
        <View style={styles.searchBox}>

          <Text style={styles.title}>
            Consultar lote
          </Text>

          <Text style={styles.description}>
            Digite o código identificador do lote para
            consultar sua origem, produção e qualidade.
          </Text>

          <TextInput
            style={styles.input}
            value={codigo}
            onChangeText={setCodigo}
            placeholder="Ex.: LT-2026-0831-001"
            placeholderTextColor="#9ca3af"
            autoCapitalize="characters"
            onSubmitEditing={consultarLote}
            returnKeyType="search"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={consultarLote}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              Consultar
            </Text>
          </TouchableOpacity>

          <Text style={styles.example}>
            💡 Para testar, utilize:
          </Text>

          <Text style={styles.exampleCode}>
            LT-2026-0831-001
          </Text>

          {erro && (
            <View style={styles.error}>
              <Text style={styles.errorText}>
                Lote não encontrado. Verifique o código informado.
              </Text>
            </View>
          )}

        </View>


        {/* RESULTADO */}
        {resultado && (
          <View>

            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>
                Informações do lote
              </Text>

              <View style={styles.status}>
                <Text style={styles.statusText}>
                  ✓ Dentro dos padrões
                </Text>
              </View>
            </View>


            {/* PRODUTO */}
            <Card title="🥛 Produto">

              <Info
                label="Produto"
                value={loteDemo.produto}
              />

              <Info
                label="Lote"
                value={loteDemo.codigo}
              />

              <Info
                label="Data de produção"
                value={loteDemo.dataProducao}
              />

              <Info
                label="Quantidade"
                value={loteDemo.quantidade}
              />

            </Card>


            {/* PRODUTOR */}
            <Card title="👨‍🌾 Produtor">

              <Info
                label="Produtor"
                value={loteDemo.produtor}
              />

              <Info
                label="Fazenda"
                value={loteDemo.fazenda}
              />

              <Info
                label="Município"
                value={loteDemo.municipio}
              />

            </Card>


            {/* ANIMAL */}
            <Card title="🐄 Animal de origem">

              <Info
                label="Identificação"
                value={loteDemo.animal}
              />

              <Info
                label="Raça"
                value={loteDemo.raca}
              />

              <Info
                label="Produção diária"
                value={loteDemo.producaoAnimal}
              />

            </Card>


            {/* LEITE */}
            <Card title="🥛 Leite utilizado">

              <Info
                label="Data da ordenha"
                value={loteDemo.ordenha}
              />

              <Info
                label="Volume coletado"
                value={loteDemo.volume}
              />

              <Info
                label="Temperatura"
                value={loteDemo.temperatura}
              />

            </Card>


            {/* QUALIDADE */}
            <View style={styles.card}>

              <Text style={styles.cardTitle}>
                📊 Indicadores de qualidade
              </Text>

              <View style={styles.qualityGrid}>

                <Quality
                  value="3,8%"
                  label="Gordura"
                />

                <Quality
                  value="3,2%"
                  label="Proteína"
                />

                <Quality
                  value="6,7"
                  label="pH"
                />

                <Quality
                  value="4,1°C"
                  label="Temperatura"
                />

              </View>

            </View>


            {/* RASTREABILIDADE */}
            <View style={styles.card}>

              <Text style={styles.cardTitle}>
                🔎 Rastreabilidade
              </Text>

              <TraceItem
                icon="🐄"
                title="Animal"
                subtitle="Vaca #0254"
              />

              <View style={styles.verticalLine} />

              <TraceItem
                icon="🌾"
                title="Fazenda"
                subtitle="Fazenda Boa Vista"
              />

              <View style={styles.verticalLine} />

              <TraceItem
                icon="🥛"
                title="Leite"
                subtitle="Ordenha #1842"
              />

              <View style={styles.verticalLine} />

              <TraceItem
                icon="🏭"
                title="Produto"
                subtitle="Lote LT-2026-0831"
              />

            </View>

          </View>
        )}

        {/* FOOTER */}
        <Text style={styles.footer}>
          Protótipo MVP — Gestão e Qualidade de Produtos Lácteos
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}


/* COMPONENTE CARD */

function Card({ title, children }) {
  return (
    <View style={styles.card}>

      <Text style={styles.cardTitle}>
        {title}
      </Text>

      {children}

    </View>
  );
}


/* COMPONENTE INFO */

function Info({ label, value }) {
  return (
    <View style={styles.info}>

      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>

    </View>
  );
}


/* COMPONENTE QUALIDADE */

function Quality({ value, label }) {
  return (
    <View style={styles.qualityItem}>

      <Text style={styles.qualityValue}>
        {value}
      </Text>

      <Text style={styles.qualityLabel}>
        {label}
      </Text>

      <Text style={styles.qualityOk}>
        ✓ Adequado
      </Text>

    </View>
  );
}


/* COMPONENTE RASTREABILIDADE */

function TraceItem({ icon, title, subtitle }) {
  return (
    <View style={styles.traceItem}>

      <View style={styles.traceIcon}>
        <Text style={styles.traceIconText}>
          {icon}
        </Text>
      </View>

      <Text style={styles.traceTitle}>
        {title}
      </Text>

      <Text style={styles.traceSubtitle}>
        {subtitle}
      </Text>

    </View>
  );
}


/* ESTILOS */

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#f4f7f5",
  },

  header: {
    backgroundColor: "#176b45",
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "bold",
  },

  logoSubtitle: {
    color: "#fff",
    fontSize: 13,
    opacity: 0.85,
    marginTop: 2,
  },

  headerStatus: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.85,
    textAlign: "right",
  },

  container: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 30,
  },

  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 22,
    marginBottom: 24,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,

    elevation: 3,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1f2933",
    marginBottom: 8,
  },

  description: {
    color: "#6b7280",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 20,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 9,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#1f2933",
    marginBottom: 10,
  },

  button: {
    height: 50,
    backgroundColor: "#176b45",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },

  example: {
    marginTop: 13,
    color: "#777",
    fontSize: 12,
  },

  exampleCode: {
    color: "#176b45",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 3,
  },

  error: {
    backgroundColor: "#fee2e2",
    borderRadius: 9,
    padding: 13,
    marginTop: 15,
  },

  errorText: {
    color: "#991b1b",
    fontSize: 13,
  },

  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  resultTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2933",
  },

  status: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
  },

  statusText: {
    color: "#166534",
    fontSize: 11,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 13,
    padding: 20,
    marginBottom: 17,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 2,
  },

  cardTitle: {
    color: "#176b45",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 14,
  },

  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#eef0f2",
  },

  label: {
    color: "#6b7280",
    fontSize: 13,
    flex: 1,
  },

  value: {
    color: "#1f2933",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "right",
    flex: 1.5,
  },

  qualityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  qualityItem: {
    backgroundColor: "#f8faf9",
    borderRadius: 10,
    padding: 15,
    width: "48%",
    marginBottom: 10,
    alignItems: "center",
  },

  qualityValue: {
    color: "#176b45",
    fontSize: 21,
    fontWeight: "bold",
  },

  qualityLabel: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 5,
  },

  qualityOk: {
    color: "#15803d",
    fontSize: 11,
    marginTop: 8,
  },

  traceItem: {
    alignItems: "center",
    paddingVertical: 8,
  },

  traceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e4f3eb",
    alignItems: "center",
    justifyContent: "center",
  },

  traceIconText: {
    fontSize: 22,
  },

  traceTitle: {
    color: "#1f2933",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 7,
  },

  traceSubtitle: {
    color: "#777",
    fontSize: 11,
    marginTop: 3,
    textAlign: "center",
  },

  verticalLine: {
    width: 2,
    height: 25,
    backgroundColor: "#b8dcca",
    alignSelf: "center",
  },

  footer: {
    color: "#8a9299",
    fontSize: 11,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
  },

});
