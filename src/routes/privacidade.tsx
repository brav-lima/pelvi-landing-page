import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout, CONTACT_EMAIL } from "@/components/pelvi/LegalLayout";

const SITE_URL = "https://www.soupelvi.com.br";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de privacidade — soupelvi" },
      {
        name: "description",
        content:
          "Como a soupelvi coleta, usa e protege seu nome e e-mail na lista de acesso antecipado, conforme a LGPD.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacidade` }],
  }),
  component: Privacidade,
});

function Privacidade() {
  return (
    <LegalLayout title="Política de privacidade">
      <p>
        Esta Política explica como tratamos seus dados pessoais quando você se inscreve na lista
        de acesso antecipado da soupelvi, em conformidade com a Lei Geral de Proteção de Dados
        (LGPD, Lei nº 13.709/2018). Ela complementa os <Link to="/termos">Termos de uso</Link>.
      </p>

      <h2>1. Controlador</h2>
      <p>
        <strong>Blvckship Tecnologia LTDA</strong>, CNPJ 69.304.059/0001-70, Edifício Primavera
        Office, Florianópolis/SC. Contato para assuntos de privacidade:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>2. Dados que coletamos</h2>
      <ul>
        <li>
          <strong>Nome e e-mail</strong>, informados por você no formulário de inscrição.
        </li>
        <li>
          Dados técnicos básicos de acesso (como endereço IP e tipo de navegador), registrados
          automaticamente pela infraestrutura de hospedagem para segurança e funcionamento do
          site.
        </li>
      </ul>
      <p>Não coletamos dados de pacientes nem dados pessoais sensíveis por este site.</p>

      <h2>3. Para que usamos</h2>
      <ul>
        <li>Registrar sua inscrição na lista de acesso antecipado.</li>
        <li>Enviar e-mails sobre a liberação de acessos, o lançamento e novidades da plataforma.</li>
        <li>Responder a contatos e pedidos relacionados aos seus dados.</li>
        <li>Manter a segurança e prevenir abusos no site.</li>
      </ul>

      <h2>4. Base legal</h2>
      <p>
        O tratamento de nome e e-mail se baseia no seu <strong>consentimento</strong> (art. 7º,
        I, da LGPD), dado ao enviar o formulário. Os registros técnicos de acesso se baseiam no
        nosso legítimo interesse em manter o site seguro (art. 7º, IX). Você pode retirar o
        consentimento a qualquer momento.
      </p>

      <h2>5. Com quem compartilhamos</h2>
      <p>
        Não vendemos seus dados. Compartilhamos apenas com prestadores que nos ajudam a operar o
        serviço, que tratam os dados em nosso nome:
      </p>
      <ul>
        <li>
          <strong>Resend</strong>: armazenamento da lista de contatos e envio de e-mails;
        </li>
        <li>
          <strong>Vercel</strong>: hospedagem do site e registros técnicos de acesso.
        </li>
      </ul>
      <p>
        Alguns desses prestadores podem processar dados fora do Brasil. Nesses casos, adotamos as
        salvaguardas previstas na LGPD para transferência internacional. Também podemos divulgar
        dados quando exigido por lei ou ordem de autoridade.
      </p>

      <h2>6. Por quanto tempo guardamos</h2>
      <p>
        Mantemos nome e e-mail enquanto você estiver na lista e durante o período de lançamento
        da plataforma. Se você pedir a exclusão ou se descadastrar, removemos seus dados, salvo
        quando a lei exigir a guarda por mais tempo.
      </p>

      <h2>7. Seus direitos</h2>
      <p>Nos termos do art. 18 da LGPD, você pode pedir, a qualquer momento:</p>
      <ul>
        <li>confirmação de que tratamos seus dados e acesso a eles;</li>
        <li>correção de dados incompletos, inexatos ou desatualizados;</li>
        <li>anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade;</li>
        <li>portabilidade dos dados;</li>
        <li>eliminação dos dados tratados com base no consentimento;</li>
        <li>informação sobre com quem compartilhamos seus dados;</li>
        <li>revogação do consentimento.</li>
      </ul>
      <p>
        Para exercer esses direitos, escreva para{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Você também pode se descadastrar
        pelo link presente nos nossos e-mails. Se entender que seus direitos não foram atendidos,
        pode recorrer à Autoridade Nacional de Proteção de Dados (ANPD).
      </p>

      <h2>8. Segurança</h2>
      <p>
        Adotamos medidas técnicas e organizacionais razoáveis para proteger seus dados contra
        acesso não autorizado, perda ou alteração, como conexão criptografada (HTTPS) e controle
        de acesso às credenciais dos serviços que usamos.
      </p>

      <h2>9. Cookies</h2>
      <p>
        Este site não usa cookies de publicidade ou de rastreamento. Se isso mudar, atualizaremos
        esta Política e, quando necessário, pediremos seu consentimento.
      </p>

      <h2>10. Alterações</h2>
      <p>
        Podemos atualizar esta Política. A versão vigente fica sempre nesta página, com a data da
        última atualização.
      </p>
    </LegalLayout>
  );
}
