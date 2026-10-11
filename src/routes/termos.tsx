import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout, CONTACT_EMAIL } from "@/components/pelvi/LegalLayout";

const SITE_URL = "https://www.soupelvi.com.br";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de uso — soupelvi" },
      {
        name: "description",
        content:
          "Termos de uso do site e da lista de acesso antecipado da plataforma soupelvi, para fisioterapeutas pélvicas.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/termos` }],
  }),
  component: Termos,
});

function Termos() {
  return (
    <LegalLayout title="Termos de uso">
      <p>
        Estes Termos de uso regulam o acesso ao site <strong>www.soupelvi.com.br</strong> e a
        inscrição na lista de acesso antecipado da plataforma soupelvi. Ao navegar no site ou
        enviar o formulário de inscrição, você declara ter lido e concordado com estes Termos e
        com a <Link to="/privacidade">Política de Privacidade</Link>.
      </p>

      <h2>1. Quem somos</h2>
      <p>
        A soupelvi é uma plataforma para fisioterapeutas pélvicas, operada por{" "}
        <strong>Blvckship Tecnologia LTDA</strong>, inscrita no CNPJ sob o nº 69.304.059/0001-70,
        com sede no Edifício Primavera Office, em Florianópolis/SC. Contato:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>2. O que este site oferece</h2>
      <p>
        O site apresenta a plataforma e permite que profissionais de fisioterapia pélvica
        informem nome e e-mail para entrar na lista de acesso antecipado. A plataforma ainda está
        em desenvolvimento: a inscrição não garante vaga, prazo de liberação, funcionalidades
        específicas ou gratuidade futura além do que for informado por e-mail no momento do
        convite.
      </p>

      <h2>3. Inscrição na lista de acesso antecipado</h2>
      <ul>
        <li>Você deve ser maior de 18 anos e informar dados verdadeiros e que sejam seus.</li>
        <li>
          Os acessos são liberados de forma gradual e a critério da soupelvi, sem obrigação de
          convidar todas as pessoas inscritas.
        </li>
        <li>
          A inscrição é gratuita e não cria vínculo contratual de prestação de serviço. O uso
          efetivo da plataforma poderá exigir a aceitação de termos específicos.
        </li>
        <li>
          Você pode sair da lista a qualquer momento, pelo link de descadastro presente nos
          e-mails ou por pedido ao nosso contato.
        </li>
      </ul>

      <h2>4. Comunicações</h2>
      <p>
        Ao se inscrever, você concorda em receber e-mails sobre o lançamento, a liberação de
        acessos e novidades da plataforma. Não enviamos spam e todo e-mail traz opção de
        descadastro.
      </p>

      <h2>5. Dados pessoais</h2>
      <p>
        Coletamos apenas nome e e-mail, tratados conforme a Lei Geral de Proteção de Dados (Lei
        nº 13.709/2018). Os detalhes estão na <Link to="/privacidade">Política de Privacidade</Link>.
      </p>

      <h2>6. Uso adequado</h2>
      <p>Ao usar o site, você se compromete a não:</p>
      <ul>
        <li>fornecer dados falsos ou de terceiros sem autorização;</li>
        <li>
          tentar acessar áreas restritas, comprometer a segurança ou sobrecarregar a
          infraestrutura do site (por exemplo, com envios automatizados ou em massa);
        </li>
        <li>usar o site para fins ilícitos ou que violem direitos de terceiros.</li>
      </ul>

      <h2>7. Propriedade intelectual</h2>
      <p>
        A marca soupelvi, o logotipo, os textos, as imagens e o código do site pertencem à
        Blvckship Tecnologia LTDA ou são usados com autorização. É proibida a reprodução ou o
        uso comercial sem permissão prévia por escrito.
      </p>

      <h2>8. Isenção de responsabilidade</h2>
      <p>
        O conteúdo do site tem caráter informativo e não constitui orientação clínica,
        diagnóstico ou recomendação de conduta profissional. Empregamos esforços razoáveis para
        manter o site disponível e correto, mas ele é oferecido no estado em que se encontra, sem
        garantia de funcionamento ininterrupto.
      </p>

      <h2>9. Links de terceiros</h2>
      <p>
        O site pode conter links para serviços de terceiros. Não controlamos esses sites e não
        nos responsabilizamos pelo seu conteúdo ou pelas suas políticas.
      </p>

      <h2>10. Alterações destes Termos</h2>
      <p>
        Podemos atualizar estes Termos a qualquer momento. A versão vigente fica sempre nesta
        página, com a data da última atualização. Mudanças relevantes serão comunicadas por
        e-mail às pessoas inscritas.
      </p>

      <h2>11. Lei aplicável e foro</h2>
      <p>
        Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de
        Florianópolis/SC para resolver qualquer controvérsia, ressalvado o foro do consumidor
        quando aplicável.
      </p>

      <h2>12. Contato</h2>
      <p>
        Dúvidas sobre estes Termos: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalLayout>
  );
}
