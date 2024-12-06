import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// Exporta a configuração do Vite como padrão.
export default defineConfig({
  // Adiciona plugins ao Vite. Neste caso, o tsconfigPaths é usado para habilitar
  // a tradução de aliases configurados no arquivo tsconfig.json.
  plugins: [tsconfigPaths()],

  // Configuração específica para testes no projeto.
  test: {
    // Define regras de correspondência entre diretórios de teste e ambientes de execução.
    // Por exemplo, quaisquer testes dentro de 'src/http/controllers/**' usarão o ambiente 'prisma'.
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
})
