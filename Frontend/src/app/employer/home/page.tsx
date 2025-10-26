import InfoComponent from "@/components/common/InfoComponent";
import UserOverview from "@/components/common/UserOverview";

export default function EmployerHome() {
  return (
    <div className="p-2 space-y-8">
      <UserOverview />
      <div className="space-y-4">
        <InfoComponent text="CV Oluştur/Güncelle sekmesinden CV nizi oluşturabilir veya güncelleyebilirsiniz." />
        <InfoComponent text="İş Başvurularım sekmesinde başvurlarınızı görüntüleyebilir ve inceleyebilirsiniz." />
        <InfoComponent text="Hesabım sekmesinde hesap bilgilerinizi görüntüleyebilir ve değişiklik yapabilirsiniz. Ayrıca bu bölümü kullanarak hesabınızı silebilirsiniz." />
        <InfoComponent text="İstek ve Talepler sekmesini kullanarak istek ve taleplerinizi bize iletebilirsiniz." />
      </div>
    </div>
  );
}
